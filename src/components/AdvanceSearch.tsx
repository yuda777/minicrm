'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray, Controller, SubmitHandler } from 'react-hook-form';
import * as z from 'zod';
import * as React from 'react';
import { toast } from '@/components/ui/use-toast';
import { LoadingButton } from '@/components/ui/loading-button';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Dropdown from '@/components/Dropdown';
import { userPositionWithSuperior } from '@/types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  operatorOptions,
  operatorValues,
  tableColumnsDesc,
  conditionValues,
  condition
} from '@/config/advanceSearch';
import { Input } from '@/components/ui/input';
import { fetchPosition, fetchDept, fetchUserWhere } from '@/app/_actions/position'
import { IParamSearch, Option, tableColumnsType, typeValues } from '@/types';
import { DatePickerWithRange } from '@/components/ui/datePickerWithRange';
import { DateRange } from 'react-day-picker';
import { MultiSelect } from "@/components/ui/multi-select";

interface positionDataProps {
  tPositionTitle: Option[],
  tPositionDept: Option[]
  optColumnData: tableColumnsType[]
}

function usePositionData() {
  const [positionData, setPositionData] = React.useState<positionDataProps>({
    tPositionTitle: [],
    tPositionDept: [],
    optColumnData: [],
  });

  const getPositionData = async () => {
    try {
      const tPositionTitle = await fetchPosition()
      const tPositionDept = await fetchDept();
      const optColumnData = tableColumnsDesc
      setPositionData({ tPositionTitle, tPositionDept, optColumnData });
    } catch (error) {
      console.error("There was an error with the fetch operation:", error);
    }


  }
  React.useEffect(() => {
    getPositionData();
  }, []);
  return {
    positionData
  }
}

type columnWithPositionType = {
  column: string
  data: Option[]
}

type AdvanceSearchProps = {
  setValue: React.Dispatch<React.SetStateAction<userPositionWithSuperior[]>>
}

const AdvanceSearch = ({
  setValue
}: AdvanceSearchProps) => {
  const [isPending, startTransition] = React.useTransition()

  const { positionData } = usePositionData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columnWithPosition: columnWithPositionType[] = [
    {
      column: 'departementCode',
      data: positionData.tPositionDept
    }, {
      column: 'titleCode',
      data: positionData.tPositionTitle
    }
  ]
  const GroupOptionSchema = z.object({
    paramSearch: z.array(
      z.object({
        condition: z.enum(conditionValues as [string, ...string[]]),
        fieldName: z.string().min(1),
        tableName: z.string().optional(),
        typeValue: z.enum(typeValues).optional(),
        operator: z.enum(operatorValues as [string, ...string[]]).optional(),
        fieldValue: z.union([
          z.string(),
          z.number(),
          z.boolean(),
          z.object({
            from: z.date(),
            to: z.date().optional(),
          }),
          z.array(
            z.object({
              value: z.union([z.string(), z.number()]),
              label: z.string(),
            })
          ),
        ]),
      }).refine((data) => {
        // console.log("data.typeValue:", data.typeValue);
        const isSpecialColumn = columnWithPosition.some(item => item.column === data.fieldName);
        if (isSpecialColumn) {
          return data.operator === 'inArray';
        }
        return true;
      }, {
        message: 'operator must be "in"',
        path: ['operator'],
      }).refine((data) => {
        if (data.typeValue === 'string') {
          return data.operator !== undefined && ["eq", "ilike"].includes(data.operator);
        }
        return true;
      }, {
        message: 'wrong filter operator',
        path: ['operator'],
      })
    )
  });

  const form = useForm<z.infer<typeof GroupOptionSchema>>({
    resolver: zodResolver(GroupOptionSchema),
    defaultValues: {
      paramSearch: [{
        fieldName: "",
        operator: undefined,
        typeValue: undefined,
        fieldValue: []
      }]
    }
  });

  const paramSearch = form.watch(`paramSearch`);
  const { fields, remove, append } = useFieldArray({
    name: "paramSearch",
    control: form.control,
  })

  const onRemoveClick = (index: number) => {
    remove(index); // Remove the item at the specified index
  };
  const emptyCombobox = (index: number) => {
    form.setValue(`paramSearch.${index}.fieldValue`, []);
  }

  // console.log(positionData.optColumnData);
  const [loading, setLoading] = React.useState(false);
  const onSubmit: SubmitHandler<IParamSearch> = async (dataSubmit: IParamSearch) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      startTransition(async () => {
        const y = await fetchUserWhere(dataSubmit)
        setValue(y)
        // console.log("y:", y);
      })
      toast({
        title: 'Your submitted data',
        description: (
          <pre className="mt-2 w-[340px]  bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(dataSubmit, null, 2)}</code>
          </pre>
        ),
      });
    }, 500);
  }

  const componentOperator = (index: number) => {
    let operatorSelected = []
    let valueDefault = undefined
    switch (form.getValues(`paramSearch.${index}.typeValue`)) {
      case "option":
        operatorSelected = operatorOptions.filter(operator => ["inArray"].includes(operator.value));
        valueDefault = "inArray"
        break;
      case "string":
        operatorSelected = operatorOptions.filter(operator => ["eq", "ilike"].includes(operator.value));
        valueDefault = "ilike"
        break;
      case "boolean":
        operatorSelected = operatorOptions.filter(operator => ["eq"].includes(operator.value));
        valueDefault = "eq"
        break;
      case "number":
        operatorSelected = operatorOptions.filter(operator => ["eq", "lt", "gt", "lte", "gte", "between"].includes(operator.value));
        valueDefault = "eq"
        break;
      case "date":
        operatorSelected = operatorOptions.filter(operator => ["between"].includes(operator.value));
        valueDefault = "between"
        break;
      default:
        operatorSelected = operatorOptions
        break;
    }
    return {
      operatorSelected,
      valueDefault
    }
  }

  const componentTypeValue = ({ index, field }) => {
    let InputVield;
    const fieldName = paramSearch[index].fieldName
    const columnWithPositionItem = columnWithPosition.find(item => item.column === fieldName);
    switch (form.getValues(`paramSearch.${index}.typeValue`)) {
      case "option":
        InputVield = (columnWithPositionItem && (
          <MultiSelect
            options={columnWithPositionItem?.data}
            defaultValue={field.value as Option[]}
            onChange={field.onChange}
            placeholder="Select Option"
          />
        ))
        break;
      case "string":
        InputVield = (<Input
          placeholder="value"
          onChange={field.onChange}
          value={field.value as string}
        />)
        break;
      case "boolean":
        InputVield = (
          <Select onValueChange={field.onChange} defaultValue={field.value as string}>
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="true">Active</SelectItem>
              <SelectItem value="false">Inactive</SelectItem>
            </SelectContent>
          </Select>
        )
        break;
      case "number":
        InputVield = (
          <Input
            min="1"
            placeholder="Enter number"
            type="number"
            value={field.value as string}
            onChange={field.onChange}
          />
        )
        break;
      case "date":
        InputVield = (
          <DatePickerWithRange
            value={field.value as DateRange}
            onChange={field.onChange}
          />
        )
        break;
      default:
        InputVield = (<Input
          placeholder="value"
          onChange={field.onChange}
          value={field.value as string}
        />)
        break;
    }
    return (
      <div className='flex-grow'>
        <FormItem>
          <FormControl>
            {InputVield}
          </FormControl>
          <FormMessage className="text-red-400" />
        </FormItem>
      </div>
    )
  }
  return (
    <Form {...form}>
      <form
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        className="w-full space-y-1">
        {fields.map((field, index) => {
          const { operatorSelected, valueDefault } = componentOperator(index)
          return (
            <div
              key={field.id}
              className='flex'
            >
              <FormField
                control={form.control}
                name={`paramSearch.${index}.condition`}
                render={({ field }) => (
                  <div className='flex'>
                    <FormItem>
                      <FormControl>
                        <Dropdown
                          placeholder="select condition"
                          onChange={(v) => field.onChange(v)}
                          options={condition}
                          value="and"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name={`paramSearch.${index}.fieldName`}
                render={({ field }) => (
                  <div className='flex'>
                    <FormItem>
                      <FormControl>
                        <Dropdown
                          placeholder="select column"
                          onChange={(value) => {
                            const dataColumn = positionData.optColumnData.find(item => item.value === value)
                            form.setValue(`paramSearch.${index}.tableName`, dataColumn.tableName);
                            form.setValue(`paramSearch.${index}.typeValue`, dataColumn.columnDataType);
                            field.onChange(value)
                            emptyCombobox(index)
                          }}
                          options={positionData.optColumnData}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name={`paramSearch.${index}.operator`}
                render={({ field }) => (
                  <div className='flex'>
                    <FormItem>
                      <FormControl>
                        <Dropdown
                          placeholder="select operator"
                          onChange={(v) => field.onChange(v)}
                          options={operatorSelected}
                          value={valueDefault}
                        />
                      </FormControl>
                      {form.formState.isSubmitted && form.formState.errors.paramSearch?.[index]?.operator && (
                        <FormMessage className="text-red-400" />
                      )}
                    </FormItem>
                  </div>
                )
                }
              />
              <FormField
                control={form.control}
                name={`paramSearch.${index}.fieldValue`}
                render={({ field }) => componentTypeValue({ index, field })}
              />
              <Button
                id={`delete${index}`}
                className={'h-10'}
                variant={"outline"}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault()
                  onRemoveClick(index)
                }}
              >
                <Icons.close
                  className="h-11 w-5  hover:bg-slate-500"
                />
              </Button>
            </div>
          )
        })}
        <div className='flex justify-end space-x-1'>
          <Button onClick={(e) => {
            e.stopPropagation();
            e.preventDefault()
            append({ condition: "and", fieldName: "", operator: undefined, fieldValue: [] })
            form.clearErrors()
          }}>
            Add
          </Button>
          <LoadingButton loading={loading} type="submit">
            Submit
          </LoadingButton>
        </div>
      </form >
    </Form>
  );
};
export default AdvanceSearch;