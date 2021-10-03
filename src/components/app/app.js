import { Component } from 'react';

import React from 'react';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { name: 'John C.', salary: 1800, increase: false, like: false, id: 1 },
                { name: 'Alex M.', salary: 3000, increase: false, like: false, id: 2 },
                { name: 'Carl W.', salary: 7000, increase: false, like: false, id: 3 },
            ],
            term: '',
            filter: 'all'
        }
        this.maxId = 4;
    }

    componentDidMount() {
        if (!localStorage.getItem('data')) {
            localStorage.setItem('data', JSON.stringify(this.state.data));
        }
        this.setState({ data: JSON.parse(localStorage.getItem('data')) });
    }

    componentDidUpdate() {
        localStorage.setItem('data', JSON.stringify(this.state.data));
    }

    deleteItem = (id) => {
        this.setState(({ data }) => {
            // const index = data.findIndex(elem => elem.id === id) // Поиск id по нужному индексу

            // const before = data.slice(0, index); // Удаление элемента из массива
            // const after = data.slice(index + 1); // Добавляем оставшуюся часть массива

            // const newArr = [...before, ...after]; // Добавляем в новый массив часчти массивов before after



            return {
                data: data.filter(item => item.id !== id) // Записываем новый массив в data (без изменений основного массива)
            }

        })
    }

    addItem = (name, salary) => {
        const newItem = { // Новый объект с даннымит name и salary
            name,
            salary,
            increase: false,
            like: false,
            id: this.maxId++
        }
        this.setState(({ data }) => {
            const newArr = [...data, newItem]; // Запись в новый массив старого массива + новый объект при помощи разворота 
            return {
                data: newArr // перезапись массива data
            }
        })
    }

    onToggleProp = (id, prop) => {
        this.setState(({ data }) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return { ...item, [prop]: !item[prop] }
                }
                return item;
            })
        }))
    }

    searchEmp = (items, term) => { // Метод фильтрации 
        if (term.lenght === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({ term });
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'like':
                return items.filter(item => item.like)
            case 'moreThen1000':
                return items.filter(item => item.salary > 1000);
            default:
                return items
        }
    }

    onFilterSelect = (filter) => {
        this.setState({ filter });
    }

    render() {
        const { data, term, filter } = this.state
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);

        return (
            <div className="app">
                <AppInfo
                    employees={employees}
                    increased={increased} />

                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch} />
                    <AppFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect} />
                </div>

                <EmployeesList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp} />
                <EmployeesAddForm
                    onAddEmployee={this.addItem} />
            </div>
        )
    }
}

export default App;