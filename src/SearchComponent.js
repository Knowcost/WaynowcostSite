import React from 'react';

export const SearchComponent = ({items, setFilteredItems}) => {

    const handleInputChange = (e) => {
        let searchValue = e.target.value;

        if (!searchValue) {
            console.log({items})
            setFilteredItems(items)
            return
        }

        const filtered = items.filter((item) => {
            if (!item.data) {
                return false
            }

            let {
                address,
                name,
                phoneNumber,
                telegram,
                workString,
                workTime
            } = item.data

            searchValue = searchValue.toLocaleLowerCase()

            // приведение к строке и приведение в нижний регистр
            address = ("" + address).toLocaleLowerCase()
            name = ("" + name).toLocaleLowerCase()
            phoneNumber = ("" + phoneNumber).toLocaleLowerCase()
            telegram = ("" + telegram).toLocaleLowerCase()
            workString = ("" + workString).toLocaleLowerCase()
            workTime = ("" + workTime).toLocaleLowerCase()

            // проверка на undefined и сравнение по каждому полю
            const matchName = address && address.indexOf(searchValue) !== -1
            const matchAddress = name && name.indexOf(searchValue) !== -1
            const matchPhone = phoneNumber && phoneNumber.indexOf(searchValue) !== -1
            const matchTelegram = telegram && telegram.indexOf(searchValue) !== -1
            const matchWorkString = workString && workString.indexOf(searchValue) !== -1
            const matchWorkTime = workTime && workTime.indexOf(searchValue) !== -1

            // общий результат сравнения
            return matchName ||
                matchAddress ||
                matchPhone ||
                matchTelegram ||
                matchWorkString ||
                matchWorkTime
        })

        setFilteredItems(filtered)
    }

    return (
        <div>
            <input
                type="text"
                onChange={handleInputChange}
            />
        </div>
    )
}