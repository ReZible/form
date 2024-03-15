import React, { useState } from 'react';
import { accommodationTypes, cities, data, universityTypes } from '@/data/data';
import {
	CustomSelect,
	ISelectOption,
} from '@/shared/custom-select/custom-select';
import { ICountry, IFormData } from '@/types/form.types';
import styles from './form.module.css';

const initialFormValue: IFormData = {
	country: null,
	city: null,
	university: null,
	accommodation: null,
};

function Form() {
	const [formValues, setFormValues] = useState(initialFormValue);
	const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(
		null
	);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		alert(
			`Страна: ${formValues.country}\nГород: ${formValues.city}\nВид ВУЗа: ${formValues.university}\nВариант проживание: ${formValues.accommodation}`
		);
	};

	const handleSelectChange = (
		elemId: string,
		fieldName: string,
		list: ISelectOption[] | undefined
	) => {
		const foundItem = list?.find((item) => item.id === elemId);

		if (!foundItem) return;

		if (fieldName === 'country') {
			setFormValues({
				...initialFormValue,
				[fieldName]: foundItem.title,
				university: formValues.university,
			});

			setSelectedCountry(foundItem as ICountry);
			return;
		}

		setFormValues({
			...formValues,
			[fieldName]: foundItem.title,
		});
	};

	return (
		<div className={styles.formWrapper}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.formItem}>
					<div className={styles.formItem_title}>
						<span>Страна</span>
					</div>
					<CustomSelect
						name='country'
						list={data}
						onSelect={(elemId, _, list) => {
							handleSelectChange(elemId, 'country', list);
						}}
						placeholder='Выберите страну'
						reset
						onReset={() =>
							setFormValues({
								...initialFormValue,
								university: formValues.university,
							})
						}
					/>
				</div>
				<div className={styles.formItem}>
					<div className={styles.formItem_title}>
						<span>Город</span>
					</div>
					<CustomSelect
						name='city'
						list={cities.filter((city) =>
							selectedCountry?.citiesId.includes(city.id)
						)}
						onSelect={(elemId, _, list) => {
							handleSelectChange(elemId, 'city', list);
						}}
						disabled={!formValues.country}
						placeholder='Выберите город'
						reset
						onReset={() =>
							setFormValues({ ...formValues, city: null })
						}
					/>
				</div>
				<div className={styles.formItem}>
					<div className={styles.formItem_title}>
						<span>Вид ВУЗа</span>
					</div>
					<CustomSelect
						name='university'
						list={universityTypes}
						onSelect={(elemId, _, list) => {
							handleSelectChange(elemId, 'university', list);
						}}
						placeholder='Выберите вид ВУЗа'
						disabled={!formValues.city || !formValues.country}
						reset
						onReset={() =>
							setFormValues({ ...formValues, university: null })
						}
					/>
				</div>
				<div className={styles.formItem}>
					<div className={styles.formItem_title}>
						<span>Проживание</span>
					</div>
					<CustomSelect
						name='accommodation'
						list={accommodationTypes.filter((accommodation) =>
							selectedCountry?.accommodationId.includes(
								accommodation.id
							)
						)}
						onSelect={(elemId, _, list) => {
							handleSelectChange(elemId, 'accommodation', list);
						}}
						disabled={
							!formValues.university ||
							!formValues.city ||
							!formValues.country
						}
						placeholder='Выберите проживание'
						reset
						onReset={() =>
							setFormValues({
								...formValues,
								accommodation: null,
							})
						}
					/>
				</div>
				<button
					type='submit'
					className={styles.formBtn}
					disabled={
						!(
							formValues.country &&
							formValues.city &&
							formValues.university &&
							formValues.accommodation
						)
					}
				>
					Отправить
				</button>
			</form>
		</div>
	);
}

export default Form;
