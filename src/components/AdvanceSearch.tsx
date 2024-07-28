'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray, Controller, SubmitHandler, useWatch } from 'react-hook-form';
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
import { CellInfoType, ConfigPageType, FieldValueType, columnWithPositionType, optionDataType, tableColumnsType, userPositionWithSuperior } from '@/types'
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
  filterColumnsByTable,
  TableUsedType,
  TableAlias,
  tableForQueryBuilder as t
} from '@/config/advanceSearch';
import { Input } from '@/components/ui/input';
import { IParamSearch, Option } from '@/types';
import { DatePickerWithRange } from '@/components/ui/datePickerWithRange';
import { DateRange } from 'react-day-picker';
import { MultiSelect } from "@/components/ui/multi-select";
import { GroupOptionSchema } from '@/lib/validateJSON';

// Constants for type values
const TYPE_VALUES = {
  OPTION: 'option',
  STRING: 'string',
  BOOLEAN: 'boolean',
  NUMBER: 'number',
  DATE: 'date',
} as const;

type TypeValueKeys = keyof typeof TYPE_VALUES;
type TypeValue = (typeof TYPE_VALUES)[TypeValueKeys];

const CompTypeValue = ({
  index,
  value,
  onChange,
  form,
  useFieldNameWatcher,
  configPage
}: {
  index: number,
  value: FieldValueType,
  onChange: (...event: any[]) => void,
  form: any,
  useFieldNameWatcher: (index: number) => string,
  configPage: ConfigPageType[]
}) => {
  const fieldName = useFieldNameWatcher(index);
  const columnWithOptionItem = findOptionData(fieldName, configPage);
  const typeValue = form.getValues(`paramSearch.${index}.typeValue`) as TypeValue;
  const renderInputField = () => {
    switch (typeValue) {
      case TYPE_VALUES.OPTION:
        return (
          <MultiSelect
            options={columnWithOptionItem ? columnWithOptionItem?.optionData : []}
            defaultValue={value as optionDataType[]}
            styleArr={columnWithOptionItem ? columnWithOptionItem?.cellInfo : undefined}
            onChange={onChange}
            placeholder="Select Option"
          />
        )
      case TYPE_VALUES.STRING:
        return (
          <Input
            placeholder="value"
            onChange={onChange}
            value={value as string}
          />
        )
      case TYPE_VALUES.BOOLEAN:
        return (
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
      case TYPE_VALUES.NUMBER:
        return (
          <Input
            min="1"
            placeholder="Enter number"
            type="number"
            value={value as string}
            onChange={onChange}
          />
        )
      case TYPE_VALUES.DATE:
        return (
          <DatePickerWithRange
            value={value as DateRange}
            onChange={onChange}
          />
        )
      default:
        return (
          <Input
            placeholder="value"
            onChange={onChange}
            value={value as string}
          />
        )
    }
  }
  return renderInputField();
}
const CompOperator = ({
  index,
  value,
  onChange,
  form,
  useFieldNameWatcher,
  configPage
}: {
  index: number,
  value: FieldValueType,
  onChange: (...event: any[]) => void,
  form: any,
  useFieldNameWatcher: (index: number) => string,
  configPage: ConfigPageType[]
}) => {
  let operatorSelected = []
  const fieldName = useFieldNameWatcher(index);
  let valueDefault = undefined
  const typeValue = form.getValues(`paramSearch.${index}.typeValue`) as TypeValue;
  switch (typeValue) {
    case TYPE_VALUES.OPTION:
      operatorSelected = operatorOptions.filter(operator => ["inArray"].includes(operator.value));
      valueDefault = "inArray"
      break;
    case TYPE_VALUES.STRING:
      operatorSelected = operatorOptions.filter(operator => ["eq", "ilike"].includes(operator.value));
      valueDefault = "ilike"
      break;
    case TYPE_VALUES.BOOLEAN:
      operatorSelected = operatorOptions.filter(operator => ["eq"].includes(operator.value));
      valueDefault = "eq"
      break;
    case TYPE_VALUES.NUMBER:
      operatorSelected = operatorOptions.filter(operator => ["eq", "lt", "gt", "lte", "gte", "between"].includes(operator.value));
      valueDefault = "eq"
      break;
    case TYPE_VALUES.DATE:
      operatorSelected = operatorOptions.filter(operator => ["between"].includes(operator.value));
      valueDefault = "between"
      break;
    default:
      operatorSelected = operatorOptions
      break;
  }

  return (
    <Dropdown
      placeholder="select operator"
      onChange={(v) => onChange(v)}
      options={operatorSelected}
      value={valueDefault}
    />
  )
}

const findOptionData = (identifier: string, config: ConfigPageType[]) => {
  const [alias, column] = identifier.split('.');
  for (const tableConfig of config) {
    if (tableConfig.alias === alias) {
      return tableConfig.column.find(col => col.value === column);
    }
  }
  return null;
};
const findTableAndColumnDataType = (identifier: string, config: ConfigPageType[]) => {
  const [alias, column] = identifier.split('.');
  for (const tableConfig of config) {
    if (tableConfig.alias === alias) {
      const columnConfig = tableConfig.column.find(col => col.value === column);
      if (columnConfig) {
        return { table: tableConfig.table, columnDataType: columnConfig.columnDataType };
      }
    }
  }
  return null;
};
const generateOptions = (config: ConfigPageType[]) => {
  return config.flatMap((tableConfig) =>
    tableConfig.column.map((col) => ({
      label: col.label,
      value: `${tableConfig.alias}.${col.value}`,
    }))
  );
};
interface AdvancedSearchProps {
  onSearch: (dataSubmit: IParamSearch) => void;
  configPage: ConfigPageType[]
}

const AdvanceSearch = ({
  onSearch,
  configPage
}: AdvancedSearchProps) => {

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

  const columnList = generateOptions(configPage)

  const { fields, remove, append } = useFieldArray({
    name: "paramSearch",
    control: form.control,
  })

  const useFieldNameWatcher = (index: number) => {

    return useWatch({
      control: form.control,
      name: `paramSearch.${index}.fieldName`,
    });
  };
  const useOperatorWatcher = (index: number) => {
    return useWatch({
      control: form.control,
      name: `paramSearch.${index}.operator`,
    });
  };

  const onRemoveClick = (index: number) => {
    remove(index);
  };
  const emptyCombobox = (index: number) => {
    form.setValue(`paramSearch.${index}.fieldValue`, []);
  }

  const [loading, setLoading] = React.useState(false);
  const onSubmit: SubmitHandler<IParamSearch> = (dataSubmit: IParamSearch) => {
    console.log("dataSubmit:", dataSubmit);

    onSearch(dataSubmit);
  }
  const classFormMessage = "text-red-400 absolute bg-background border py-1 px-2"

  return (
    <Form {...form}>
      <form
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        className="w-full space-y-1">
        {fields.map((field, index) => {
          // const { operatorSelected, valueDefault } = componentOperator(index)
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
                      {form.formState.isSubmitted && form.formState.errors.paramSearch?.[index]?.condition && (
                        <FormMessage className={classFormMessage} />
                      )}
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
                            console.log("value", value);
                            const { table, columnDataType } = findTableAndColumnDataType(value, configPage)
                            if (table && columnDataType) {
                              form.setValue(`paramSearch.${index}.tableName`, table || "");
                              form.setValue(`paramSearch.${index}.typeValue`, columnDataType);
                            }
                            field.onChange(value)
                            emptyCombobox(index)
                          }}
                          options={columnList}
                        />
                      </FormControl>
                      {form.formState.isSubmitted && form.formState.errors.paramSearch?.[index]?.fieldName && (
                        <FormMessage className={classFormMessage} />
                      )}
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
                        <CompOperator
                          index={index}
                          onChange={(v) => field.onChange(v)}
                          value={field.value}
                          form={form}
                          useFieldNameWatcher={useFieldNameWatcher}
                          configPage={configPage}
                        />
                      </FormControl>
                      {form.formState.isSubmitted && form.formState.errors.paramSearch?.[index]?.operator && (
                        <FormMessage className={classFormMessage} />
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
                          onChange={(v) => field.onChange(v)}
                          value={field.value}
                          form={form}
                          useFieldNameWatcher={useFieldNameWatcher}
                          configPage={configPage}
                        />
                      </FormControl>
                      {/* {form.formState.isSubmitted && form.formState.errors.paramSearch?.[index]?.fieldValue && (
                        <FormMessage className={classFormMessage} />
                      )} */}
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
            <Icons.add
              className='h-4 w-4 text-muted-foreground mr-2'
              aria-hidden="true"
            />
            <span>Add</span>
          </Button>
          <LoadingButton loading={loading} type="submit">
            <Icons.search
              className='h-4 w-4 text-muted-foreground mr-2'
              aria-hidden="true"
            />
            <span>
              Search
            </span>
          </LoadingButton>
        </div>
      </form >
    </Form>
  );
};

export default AdvanceSearch;