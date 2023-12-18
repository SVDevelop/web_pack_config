import { useEffect, useState } from "react";
// import {Select} from "@/components/Select"
import { useGetCurrenciesQuery } from "@/store/currenciesApi";

import styles from './App.module.scss'
import { Select } from "@/ui/Select";
                /* 
// @ts-ignore */
import { ValueType } from 'react-select'
import type {TSelectOption} from '@/ui/Select';

type OptionType = { label: string; value: number }

export const App = () => {
    const [selectOPtions, setSelectOPtions] = useState([])
    const { data, isLoading, isSuccess } = useGetCurrenciesQuery('', {})

    const [selectedOptions, setSelectedOPtions] = useState<TSelectOption>()

    useEffect(() => {
        if (data?.data) {
            setSelectOPtions(data.data.reduce((acc, {id}) => [...acc, {
            value: id,
            label: id
        }], []))
        }
        
    }, [data])
    return (
        <>
            <div className={styles.main}>
                <h1 className={styles.header}>
                    <span>
                    CAT
                    </span>
                    <span>
                    <i>currencies</i> 
                    <i>academic</i>
                    <i>terms</i>
                    </span>
                </h1>
                <Select 
                    options={selectOPtions}
                    value={selectedOptions || selectOPtions[0]}
                    onChange={(value:ValueType<TSelectOption>) => setSelectedOPtions(value) }
                />
            <p className={styles.fullname}>{(selectedOptions || selectOPtions[0])?.value}</p>
            </div>
        </>
    );
}