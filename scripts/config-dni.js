function config() {

    let dni_elements = {
        numero: document.getElementById("dni-number") || {},
        numero_raw: document.getElementById("dni-number-raw") || {},
        surname: document.getElementById("dni-surname") || {},
        surname_raw: document.getElementById("dni-surname-raw") || {},
        name: document.getElementById("dni-name") || {},
        name_raw: document.getElementById("dni-name-raw") || {},
        sex: document.getElementById("dni-sex") || {},
        birth: document.getElementById("dni-birth") || {},
        birth_details: document.getElementById("dni-birth-details") || {},
        issue: document.getElementById("dni-issue") || {},
        issue_details: document.getElementById("dni-issue-details") || {},
        expiration: document.getElementById("dni-expiration") || {},
        expiration_details: document.getElementById("dni-expiration-details") || {},
        tramite_num: document.getElementById("dni-tramite-num") || {},
        ejemplar: document.getElementById('dni-ejemplar') || {},
        image: document.getElementById('dni-image') || {},
        address_inc: document.getElementById('dni-address-inc') || {},
        address: document.getElementById('dni-address') || {},
        cuil1: document.getElementById('dni-cuil-1') || {},
        cuil2: document.getElementById('dni-cuil-2') || {},
        mrz: document.getElementById('dni-mrz') || {},
        firma: document.getElementById('dni-firma') || {}
    }
    
    dni_elements.surname.innerText = localStorage.getItem('dni_surname') || 'APELLIDO'
    dni_elements.surname_raw.innerText = localStorage.getItem('dni_surname_raw') || 'APELLIDO'
    dni_elements.name.innerText = localStorage.getItem('dni_name') || 'NOMBRE EJEMPLO'
    dni_elements.name_raw.innerText = localStorage.getItem('dni_name_raw') || 'NOMBRE EJEMPLO'
    dni_elements.sex.innerText = localStorage.getItem('dni_sex') || 'E'
    dni_elements.birth.innerText = localStorage.getItem('dni_birthdate') || '22 JUN/ JUN 2022'
    dni_elements.birth_details.innerText = localStorage.getItem('dni_birthdate_details') || '22/JUN/2022'
    dni_elements.issue.innerText = localStorage.getItem('dni_emission') || '22 SET/ SET 2012'
    dni_elements.issue_details.innerText = localStorage.getItem('dni_emission_details') || '22/SET/2012'
    dni_elements.expiration.innerText = localStorage.getItem('dni_expiration') || '22 SET/ SET 2042'
    dni_elements.expiration_details.innerText = localStorage.getItem('dni_expiration_details') || '22/SET/2042'
    dni_elements.tramite_num.innerText = localStorage.getItem('dni_tramite_num') || '0123456789012345'
    dni_elements.ejemplar.innerText = localStorage.getItem('dni_ejemplar') || 'A'
    dni_elements.numero.innerText = localStorage.getItem('dni_numero') || '46.693.266'
    dni_elements.numero_raw.innerText = localStorage.getItem('dni_numero_raw') || '46693266'
    dni_elements.image.src = localStorage.getItem('dni_image') || 'res/default-dni.png'
    dni_elements.firma.src = localStorage.getItem('dni_firma') || 'res/default-dni.png'
    dni_elements.address_inc.innerHTML = '<font style="font-size: calc(9px * var(--dni-size-multiplier));">DOMICILIO</font> ' + localStorage.getItem('dni_address') || 'None'
    dni_elements.address.innerHTML = localStorage.getItem('dni_address') || 'None'
    dni_elements.cuil1.innerText = localStorage.getItem('dni_cuil_part1') || '00'
    dni_elements.cuil2.innerText = localStorage.getItem('dni_cuil_part2') || '0'
    dni_elements.mrz.innerText = localStorage.getItem('dni_mrz')
}
