import React, { useEffect, useRef, useState } from 'react';
import arrowDown from '@/assets/arrow-down.svg';
import arrowUp from '@/assets/arrow-up.svg';
import resetBtn from '@/assets/reset.svg';
import styles from './custom-select.module.css';

export interface ISelectOption {
	id: string;
	title: string;
}

export type HandleSelectChangeFunction = (
	elemId: string,
	selectedOption?: ISelectOption,
	list?: ISelectOption[]
) => void;

interface IProps {
	name: string;
	list: ISelectOption[];
	disabled?: boolean;
	onSelect: HandleSelectChangeFunction;
	placeholder?: string;
	reset?: boolean;
	onReset?: () => void;
}
function CustomSelect({
	name,
	list,
	disabled = false,
	onSelect,
	placeholder = 'Выбрать...',
	reset = false,
	onReset,
}: IProps) {
	const [selected, setSelected] = useState<ISelectOption | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (list) {
			const founded = list.find(
				(option) =>
					option.id === selected?.id &&
					option.title === selected.title
			);

			setSelected(founded || null);
		}
	}, [list, selected]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [ref]);

	const handleSelect = (event: React.MouseEvent<HTMLLIElement>) => {
		const selectedOption = list?.find(
			(option) => option.id === event.currentTarget.getAttribute('value')
		);

		if (selectedOption) {
			setSelected(selectedOption);
			onSelect(selectedOption?.id, selectedOption, list);
		}
	};

	const handleRest = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation();
		setSelected(null);

		if (onReset) {
			onReset();
		}
	};

	const handleClick = () => {
		if (disabled) return;

		setIsOpen(!isOpen);
	};

	return (
		<div
			ref={ref}
			onClick={handleClick}
			className={`${styles.customSelect_wrapper} ${disabled ? styles.customSelect_disabled : undefined} customSelect_${name}`}
		>
			<div
				className={styles.customSelect}
				style={{
					padding: reset ? '5px 30px 5px 25px' : '5px 30px 5px 10px',
				}}
			>
				{selected?.title || placeholder}
			</div>
			{reset && (
				<button
					type='button'
					onClick={handleRest}
					className={styles.customSelect_reset}
				>
					<img width={15} height={15} src={resetBtn} alt='reset' />
				</button>
			)}
			{isOpen && (
				<ul className={styles.customSelect_ul}>
					{list.map((el) => (
						<li
							className={
								selected?.id === el.id
									? styles.customSelect_liSelected
									: undefined
							}
							value={el.id}
							key={`select_${el.id}`}
							onClick={handleSelect}
						>
							{el.title}
						</li>
					))}
				</ul>
			)}
			<div className={styles.customSelect_arrow}>
				<img
					width={15}
					height={15}
					src={isOpen ? arrowUp : arrowDown}
					alt='arrow'
				/>
			</div>
		</div>
	);
}

export { CustomSelect };
