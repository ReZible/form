interface IFormData {
	country: string | null;
	city: string | null;
	university: string | null;
	accommodation: string | null;
}

interface ICountry {
	id: string;
	title: string;
	citiesId: string[];
	accommodationId: string[];
}

interface ICity {
	id: string;
	title: string;
}

interface IAccommodation {
	id: string;
	title: string;
}
interface IUniversity {
	id: string;
	title: string;
}

export type { IFormData, ICountry, ICity, IUniversity, IAccommodation };
