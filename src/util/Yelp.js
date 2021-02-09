const apiKey = 'k7JFRD5sF0PXJtuyOxx8JD6m4-4YCghmYSZ0DxaEChah5SkssTzy2GsD2QqBrBhSkWihQMmo7avEIyYOy3zZL9rJRbwUnbpfcPnRFn8lrBbdvK8euPclJZi1t5qQXnYx';
const clientID = '1E-qee5VF4vRkZTeeFYurw';
const CORSPrefix = 'https://cors-anywhere.herokuapp.com/';

let Yelp = {
    search: function(term, location, sortBy) {
        console.log(CORSPrefix + `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`);
        return (
            fetch(
                CORSPrefix + `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, 
                { headers: { Authorization: `Bearer ${apiKey}` } })
            .then(response => {
                console.log('La fetch ha dato risposta: ' + response.ok)
                return response.json();
            })
            .catch(error => console.log(`Questo è errore da fetch ${error.message}`))
            .then(jsonResponse => {
                if(jsonResponse.businesses) {
                    let toReturn = jsonResponse.businesses.map(business => {
                        return {
                            id: business.id,
                            imageSrc: business.image_url,
                            name: business.name,
                            address: business.location.address1,
                            city: business.location.city,
                            state: business.location.state,
                            zipCode: business.location.zip_code,
                            category: business.categories.title,
                            rating: business.categories.rating,
                            reviewCount: business.categories.review_count
                        }
                    })
                    return toReturn;
                }
            })
        );
    }
};

export default Yelp;