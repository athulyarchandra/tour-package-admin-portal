import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [tourType, setTourType] = useState(null);
    const [tourCategory, setTourCategory] = useState(null);
    const [tourNames, setTourNames] = useState(null);
    const [withdrawalDate, setWithdrawalDate] = useState(null);

    const resetFilters = () => {
        setTourType(null);
        setTourCategory(null);
        setTourNames(null);
        setWithdrawalDate(null);
    };

    return (
        <FilterContext.Provider
            value={{
                tourType,
                setTourType,
                tourCategory,
                setTourCategory,
                tourNames,
                setTourNames,
                withdrawalDate,
                setWithdrawalDate,
                resetFilters,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};

export const useFilter = () => useContext(FilterContext);