import React from 'react';
import EmployeesListItem from "../employees-list-item/employees-list-item"
import './employees-list.css';

const EmployeesList = ({ data, onDelete, onToggleProp }) => { // Приходит массив с данными

    const elements = data.map(item => { // Каждый элемент массива
        return (
            <EmployeesListItem name={item.name}
                salary={item.salary}
                increase={item.increase}
                like={item.like}
                key={item.id}
                onDelete={() => onDelete(item.id)}
                // onToggleIncrease={() => onToggleIncrease(item.id)}
                onToggleProp={(e) => onToggleProp(item.id, e.currentTarget.getAttribute('data-toggle'))} />
        )
    });

    return (

        < ul className="app-list list-group" >
            {elements}
        </ul >
    )
}

export default EmployeesList;