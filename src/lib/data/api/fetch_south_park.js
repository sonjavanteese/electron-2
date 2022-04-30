import supabase from './supabase';

// { type: 'supabase' table: 'south_park', keys: 'ep,titel,name,st,tags,id,assets' }
export const fetch_south_park = async (filter) => {
	let filterSets = filter;
	let query = supabase.from('south_park').select('*');
	if (filterSets) {
		query = query.eq('id', filterSets).single();
	}
	query = query.order('st', { ascending: true }).order('ep', { ascending: true });

	let { data, error } = await query;
	if (data) {
		return data;
	} else {
		throw new Error(error, data);
	}
};

export default fetch_south_park;
