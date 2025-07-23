function getUserByDni(dni, token) {
    // const tokenTest = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjU4MDI2NTgsImV4cCI6MTY2NjQwNzQ1OCwiYXVkIjpbImh0dHA6Ly9sb2NhbGhvc3QvIl0sImlzcyI6Imh0dHBzOi8vY29tLnBpbmEubWlhcmdlbnRpbmFhcGkvIn0.eJTyfEgc1zzVaUldMKblSN5Hk9g9wwxtnpTHqfru820"

    return axios.get('https://miarg.relied.cloud/user/getByDni', {
        params: {
            dni: dni
        },
        headers: { 
            Authorization: `Bearer ${token}` 
        }
    }).then(response => {
        console.log(response)
        return response
    }).catch(error => {
        // window.location.replace("error.html")
        console.log(error)
    })
}

async function saveData(rawDni, token){
    const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SET', 'OCT', 'NOV', 'DIC']
    const en_months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SET', 'OCT', 'NOV', 'DEC']

    let user;

    user = await getUserByDni(rawDni, token)

    let dni = {
        number: user.data.number,
        name: user.data.name,
        surname: user.data.surname,
        birthdate: new Date((user.data.birthdate).replace(/-/g, '\/')),
        emission_date: new Date((user.data.emission_date).replace(/-/g, '\/')),
        expiration_date: new Date((user.data.expiration_date).replace(/-/g, '\/')),
        tramite_number: user.data.tramite_number,
        ejemplar: user.data.ejemplar,
        sex: user.data.sex,
        cuil: splitNum(user.data.cuil,2),
        image: user.data.image,
        firma: user.data.firma,
        address: user.data.address,
    }

    function splitNum(num, pos){
        num = num.toString();
        return [num.substring(0, pos), num.substring(pos)];
    }

    function formatDatesForDNI(dateObj) {
        let month_name = months[dateObj.getMonth()]
        let en_month_name = en_months[dateObj.getMonth()]
        let day_number = String(dateObj.getDate()).padStart(2, "0");
        let year = dateObj.getFullYear()
        return `${day_number} ${month_name}/ ${en_month_name} ${year}`
    }

    function formatDatesForMRZ(dateObj) {
        let month = String(dateObj.getMonth() + 1).padStart(2, "0");
        let day_number = String(dateObj.getDate()).padStart(2, "0");
        let year = String(dateObj.getFullYear());
        return `${year}-${month}-${day_number}`
    }

    function formatDatesForDetails(dateObj) {
        let month_name = months[dateObj.getMonth()]
        let day_number = String(dateObj.getDate()).padStart(2, "0");
        let year = dateObj.getFullYear()
        return `${day_number}/${month_name}/${year}`
    }

    function formatSexForMRZ(sexObj) {
        if (sexObj == 'M') {
            return 'male'
        } else if (sexObj == 'F') {
            return 'female'
        } else {
            return 'male'
        }
    }

    const removeAccents = (str) => {
        str = str.replaceAll('Ñ', 'NXX')

        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    } 
    
    const mrz_data = {
        passport: {
            mrzType: 'td1',
            type: 'i',
            precisionType: 'd',
            issuingCountry: 'ARG',
            number: String(dni.number),
            expirationDate: String(formatDatesForMRZ(dni.expiration_date)),
        },
        user: {
            surname: removeAccents(String(dni.surname).toUpperCase()),
            givenNames: removeAccents(String(dni.name).toUpperCase()),
            nationality: 'ARG',
            dateOfBirth: String(formatDatesForMRZ(dni.birthdate)),
            sex: formatSexForMRZ(dni.sex)
        }
    }

    function replaceCharWithUpperCase(str) {
        return str.replaceAll('Ñ', 'ñ');
    }

    //Saving dni number
    localStorage.setItem('dni_numero_raw', dni.number);
    localStorage.setItem('dni_numero', String(dni.number).replace(/(.)(?=(\d{3})+$)/g,'$1.'));

    //Saving name
    localStorage.setItem('dni_name_raw', dni.name);
    localStorage.setItem('dni_name', String(dni.name).toUpperCase());

    //Saving surname
    localStorage.setItem('dni_surname_raw', dni.surname);
    localStorage.setItem('dni_surname', replaceCharWithUpperCase(String(dni.surname).toUpperCase()));

    //Saving sex
    localStorage.setItem('dni_sex_raw', dni.sex);
    localStorage.setItem('dni_sex', String(dni.sex).toUpperCase())

    //Saving birth
    localStorage.setItem('dni_birthdate_raw', dni.birthdate);
    localStorage.setItem('dni_birthdate', formatDatesForDNI(dni.birthdate))
    localStorage.setItem('dni_birthdate_details', formatDatesForDetails(dni.birthdate))

    //Saving emission
    localStorage.setItem('dni_emission_raw', dni.emission_date);
    localStorage.setItem('dni_emission', formatDatesForDNI(dni.emission_date))
    localStorage.setItem('dni_emission_details', formatDatesForDetails(dni.emission_date))

    //Saving expiration
    localStorage.setItem('dni_expiration_raw', dni.expiration_date);
    localStorage.setItem('dni_expiration', formatDatesForDNI(dni.expiration_date))
    localStorage.setItem('dni_expiration_details', formatDatesForDetails(dni.expiration_date))

    //Saving tramite number
    localStorage.setItem('dni_tramite_num', dni.tramite_number);

    //Saving ejemplar
    localStorage.setItem('dni_ejemplar', String(dni.ejemplar).toUpperCase());

    //Saving cuil parts
    localStorage.setItem('dni_cuil_part1', dni.cuil[0]);
    localStorage.setItem('dni_cuil_part2', dni.cuil[1]);

    //Saving address
    localStorage.setItem('dni_address', String(dni.address).toUpperCase());

    //Saving image
    localStorage.setItem('dni_image', dni.image);

    //Saving firma 
    localStorage.setItem('dni_firma', dni.firma)

    axios.post('https://miarg.relied.cloud/user/mrz', mrz_data, {
        headers: { 
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }}).then(async response => {
        await localStorage.setItem('dni_mrz', response.data);
    }).catch(error => {
        console.error(error)
    })
}

function preview_image(event, img_id){
    var reader = new FileReader();
    reader.onload = function(){
        var output = document.getElementById(img_id);
        output.src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
}

function restoreDataFromStorage(){
    let dni = getDniData();
    console.log(dni)
    document.getElementById('dni-number').value = dni.number
    document.getElementById('dni-name').value = dni.name
    document.getElementById('dni-surname').value = dni.surname

    if(String(dni.sex).toUpperCase() === "M"){
        document.getElementById('dni-sex-m').checked = true;
        document.getElementById('dni-sex-f').checked = false;
    }else{
        document.getElementById('dni-sex-f').checked = true;
        document.getElementById('dni-sex-m').checked = false;
    }

    document.getElementById('dni-birth').value = dni.birthdate;
    document.getElementById('dni-emission').value = dni.emission_date
    document.getElementById('dni-expiration').value = dni.expiration_date

    document.getElementById('dni-tramite-num').value = dni.tramite_number
    document.getElementById('dni-ejemplar').value = dni.ejemplar
    document.getElementById('dni-first-cuil').value = dni.cuil[0]
    document.getElementById('dni-last-cuil').value = dni.cuil[1]

    document.getElementById('dni-address').value = dni.address;

    document.getElementById('dni-image-viewer').src = dni.image

    document.getElementById('dni-firma-viewer').src = dni.firma
}

function getDniData(){
    let dni = {
        number: null,
        name: null,
        surname: null,
        birthdate: null,
        emission_date: null,
        expiration_date: null,
        tramite_number: null,
        ejemplar: null,
        sex: null,
        cuil: [null, null],
        image: null,
        address: null,
        firma: null,
    }

    dni.number = localStorage.getItem('dni_numero_raw');
    dni.name = localStorage.getItem('dni_name');
    dni.surname = localStorage.getItem('dni_surname');
    dni.birthdate = new Date((localStorage.getItem('dni_birthdate_raw') || '') || undefined);
    dni.emission_date = new Date((localStorage.getItem('dni_emission_raw') || '') || undefined);
    dni.expiration_date = new Date((localStorage.getItem('dni_expiration_raw') || '') || undefined);
    dni.tramite_number = localStorage.getItem('dni_tramite_num');
    dni.ejemplar = localStorage.getItem('dni_ejemplar');
    dni.sex = localStorage.getItem('dni_sex')
    dni.cuil[0] = localStorage.getItem('dni_cuil_part1')
    dni.cuil[1] = localStorage.getItem('dni_cuil_part2')
    dni.image = localStorage.getItem('dni_image')
    dni.firma = localStorage.getItem('dni_firma')
    dni.address = localStorage.getItem('dni_address')

    if(isValidDate(dni.birthdate)){
        dni.birthdate = dni.birthdate.toISOString().split('T', 10)[0]
    }else{
        dni.birthdate = null;
    }
    if(isValidDate(dni.emission_date)){
        console.log(dni.emission_date)
        dni.emission_date = (dni.emission_date).toISOString().split('T', 10)[0]
    }else{
        dni.emission_date = null;
    }
    if(isValidDate(dni.expiration_date)){
        dni.expiration_date = dni.expiration_date.toISOString().split('T', 10)[0]
    }else{
        dni.expiration_date = null;
    }
    
    return dni;
}

function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
}
