'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray, Controller, SubmitHandler } from 'react-hook-form';
import * as z from 'zod';
import * as React from 'react';
import { LoadingButton } from '@/components/ui/loading-button';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import Dropdown from '@/components/Dropdown';
import { FieldValueType, columnWithPositionType, userPositionWithSuperior } from '@/types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  operatorOptions,
  tableColumnsDesc,
  condition,
  TableUsedType,
  TableAlias,
  tableForQueryBuilder as t
} from '@/config/advanceSearch';
import { Input } from '@/components/ui/input';
import ListUserPage from '@/app/_actions/position'
import { IParamSearch, Option } from '@/types';
import { DatePickerWithRange } from '@/components/ui/datePickerWithRange';
import { DateRange } from 'react-day-picker';
import { MultiSelect } from "@/components/ui/multi-select";
import { usePositionData } from '@/hooks/usePositionData';
import { GroupOptionSchema } from '@/lib/validations/user';


interface AdvancedSearchProps {
  onSearch: (dataSubmit: IParamSearch) => void;
  options: columnWithPositionType[]
}

const AdvanceSearch = ({ onSearch, options: columnWithPosition }: AdvancedSearchProps) => {
  // const [columnWithPosition, setColumnWithPosition] = React.useState<columnWithPositionType[]>([])
  // const vas = usePositionData();
  // React.useEffect(() => {
  //   const getPosition = async () => {
  //     // eslint-disable-next-line react-hooks/rules-of-hooks
  //     const pos = usePositionData();
  //     setColumnWithPosition(pos);
  //   }
  //   getPosition();
  // }, [])
  // const columnWithPosition = usePositionData();
  const searchSchema = GroupOptionSchema()
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
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
    remove(index);
  };
  const emptyCombobox = (index: number) => {
    form.setValue(`paramSearch.${index}.fieldValue`, []);
  }

  const [loading, setLoading] = React.useState(false);
  const onSubmit: SubmitHandler<IParamSearch> = (dataSubmit: IParamSearch) => {
    onSearch(dataSubmit);
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

  const CompTypeValue = ({
    index,
    value,
    onChange
  }: {
    index: number,
    value: FieldValueType,
    onChange: (...event: any[]) => void
  }) => {
    let InputVield;
    const fieldName = paramSearch[index].fieldName
    const columnWithPositionItem = columnWithPosition.find(item => item.column === fieldName);

    switch (form.getValues(`paramSearch.${index}.typeValue`)) {
      case "option":
        InputVield = (columnWithPositionItem && (
          <MultiSelect
            options={columnWithPositionItem?.data}
            defaultValue={value as Option[]}
            onChange={onChange}
            placeholder="Select Option"
          />
        ))
        break;
      case "string":
        InputVield = (<Input
          placeholder="value"
          onChange={onChange}
          value={value as string}
        />)
        break;
      case "boolean":
        InputVield = (
          <Select onValueChange={onChange} defaultValue={value as string}>
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
            value={value as string}
            onChange={onChange}
          />
        )
        break;
      case "date":
        InputVield = (
          <DatePickerWithRange
            value={value as DateRange}
            onChange={onChange}
          />
        )
        break;
      default:
        InputVield = (<Input
          placeholder="value"
          onChange={onChange}
          value={value as string}
        />)
        break;
    }
    return InputVield
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
                            const dataColumn = tableColumnsDesc.find(item => item.value === value)
                            form.setValue(`paramSearch.${index}.tableName`, dataColumn.tableName);
                            form.setValue(`paramSearch.${index}.typeValue`, dataColumn.columnDataType);
                            field.onChange(value)
                            emptyCombobox(index)
                          }}
                          options={tableColumnsDesc}
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
                render={({ field }) => (
                  <div className='flex-grow'>
                    <FormItem>
                      <FormControl>
                        <CompTypeValue
                          index={index}
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                    </FormItem>
                  </div>
                )}
              />
              {fields.length > 1 && (
                <Button
                  id={`delete${index}`}
                  className={'min-h-10'}
                  variant={"outline"}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault()
                    onRemoveClick(index)
                  }}
                >
                  <Icons.close
                    className="h-10 w-5"
                  />
                </Button>
              )}
            </div>
          )
        })}
        <div className='flex justify-end space-x-1'>
          <Button
            variant='outline'
            onClick={(e) => {
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