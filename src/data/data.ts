import {
	IAccommodation,
	ICity,
	ICountry,
	IUniversity,
} from '@/types/form.types';

const ACCOMMODATION_KEYS = {
	DORMITORY: 'DORMITORY',
	NOT_INTERESTED: 'NOT_INTERESTED',
	RENTAL: 'RENTAL',
	DORMITORY_WITH_RENTAL: 'DORMITORY_WITH_RENTAL',
} as const;

const UNIVERSITY_KEYS = {
	TECHNICAL: 'TECHNICAL',
	HUMANITARIAN: 'HUMANITARIAN',
} as const;

const data: ICountry[] = [
	{
		id: '1',
		title: 'РБ',
		citiesId: ['3', '4'],
		accommodationId: [
			ACCOMMODATION_KEYS.DORMITORY,
			ACCOMMODATION_KEYS.NOT_INTERESTED,
		],
	},
	{
		id: '2',
		title: 'РФ',
		citiesId: ['1', '2'],
		accommodationId: [
			ACCOMMODATION_KEYS.DORMITORY,
			ACCOMMODATION_KEYS.RENTAL,
			ACCOMMODATION_KEYS.DORMITORY_WITH_RENTAL,
			ACCOMMODATION_KEYS.NOT_INTERESTED,
		],
	},
];

const cities: ICity[] = [
	{ id: '1', title: 'Москва' },
	{ id: '2', title: 'Сочи' },
	{ id: '3', title: 'Минск' },
	{ id: '4', title: 'Гомель' },
];

const accommodationTypes: IAccommodation[] = [
	{ id: ACCOMMODATION_KEYS.DORMITORY, title: 'Общежитие' },
	{ id: ACCOMMODATION_KEYS.NOT_INTERESTED, title: 'Не интересует' },
	{ id: ACCOMMODATION_KEYS.RENTAL, title: 'Аренда' },
	{
		id: ACCOMMODATION_KEYS.DORMITORY_WITH_RENTAL,
		title: 'Общежитие + Аренда',
	},
];

const universityTypes: IUniversity[] = [
	{ id: UNIVERSITY_KEYS.TECHNICAL, title: 'Технический' },
	{ id: UNIVERSITY_KEYS.HUMANITARIAN, title: 'Гуманитарный' },
];

export { data, cities, accommodationTypes, universityTypes };
