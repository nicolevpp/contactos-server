const nameInput = document.querySelector('#name-input');
const phoneInput = document.querySelector('#phone-input');
const formBtn = document.querySelector('#form-btn');
const form = document.querySelector('#form');
const phoneAdded = document.getElementsByClassName('phone-added')
const nameAdded = document.getElementsByClassName('name-added')
const list = document.querySelector('#list');



// Regex
const NAME_REGEX = /^([a-zA-ZùÙüÜäàáëèéïìíöòóüùúÄÀÁËÈÉÏÌÍÖÒÓÜÚñÑ\s]+)$/;
const PHONE_REGEX = /^[0](412|414|416|426|424|212)([0-9]{7})$/;

// Validations
let nameValidation = false;
let phoneValidation = false;

// Functions
const validateInput = (input, regexValidation) => {
    const infoText = input.parentElement.children[2];
    formBtn.disabled = nameValidation && phoneValidation? false : true;
    if (input.value === '') {
        input.classList.remove('correct');
        input.classList.remove('wrong');
        infoText.classList.remove('show');
    } else if (regexValidation) {
        input.classList.add('correct');
        input.classList.remove('wrong');
        infoText.classList.remove('show');
    } else {
        input.classList.remove('correct');
        input.classList.add('wrong');
        infoText.classList.add('show');
    }
}

nameInput.addEventListener('input', e => {
    nameValidation = NAME_REGEX.test(nameInput.value);
    validateInput(nameInput, nameValidation);
});

phoneInput.addEventListener('input', e => {
    phoneValidation = PHONE_REGEX.test(phoneInput.value);
    validateInput(phoneInput, phoneValidation);
});

// Añadir contacto nuevo:

form.addEventListener('submit', async e => {
    e.preventDefault();
    
    const responseJSON = await fetch('http://localhost:3000/contacts', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: nameInput.value, phone: phoneInput.value})
    });

    const response = await responseJSON.json();
    console.log(response);

        // Crear elemento de la lista
        const listItem = document.createElement('li');
        // Creo contenido del li dependiendo de lo que escribio el usuario en los inputs
    listItem.innerHTML = `
    <li class="contact-item" id="${response.id}">
        <input type="text" class="name-added" value="${response.name}" readonly>
        <input type="text" class="phone-added" value="${response.phone}" readonly>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="edit-icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="delete-icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
    </li>
    `
    ;
    // Agrego el elemento a la lista
    list.append(listItem);
    // Limpio los inputs
    nameInput.value = '';
    phoneInput.value = '';
    validateInput(nameInput);
    validateInput(phoneInput);
    nameValidation = false;
    phoneValidation = false;
    formBtn.disabled = true;
});

const getContacts = async () => {
    const response = await fetch('http://localhost:3000/contacts', {method: 'GET'});
    const contacts = await response.json();
    contacts.forEach(contact => {const listItem = document.createElement('li');
    // Creo contenido del li dependiendo de lo que escribio el usuario en los inputs
listItem.innerHTML = `
<li class="contact-item" id="${contact.id}">
    <input type="text" class="name-added" value="${contact.name}" readonly>
    <input type="text" class="phone-added" value="${contact.phone}" readonly>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="edit-icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="delete-icon">
    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
</li>
`
;
// Agrego el elemento a la lista
list.append(listItem);
    });
}

getContacts();


list.addEventListener('click', async e => {
    if (e.target.closest('.delete-icon')) {
       
        const id = e.target.parentElement.id;

        // borrando de la db
        await fetch(`http://localhost:3000/contacts/${id}`, {method: 'DELETE'});
        e.target.closest('.delete-icon').parentElement.parentElement.remove();
    }


    if (e.target.closest('.edit-icon')) {

        const id = e.target.parentElement.id;
    
        // 1. Selecciono el icono de editar
        const editIcon = e.target.closest('.edit-icon');
        // 2. Selecciono el input
        const editInputPhone = editIcon.parentElement.children[1];
        const editInputName = editIcon.parentElement.children[0];
        
        // 3. Defino mi condicional usando una clase llamada editando para saber el estado del boton
        if (editIcon.classList.contains('editando')) {
            // Cuando edita
            // Remuevo la clase de editando para indicar que esta guardando los cambios
            editIcon.classList.remove('editando');
            // Guardo el nuevo valor del input
            editInputPhone.setAttribute('value', editInputPhone.value);
            editInputName.setAttribute('value', editInputName.value);
            editInputPhone.setAttribute('readonly', 'true');
            editInputName.setAttribute('readonly', 'true');
            // Coloco el icono de editar
            editIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            `;
          
            editInputPhone.classList.remove('editing');
            editInputName.classList.remove('editing');
            
            await fetch(`http://localhost:3000/contacts/${id}`, { 
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: editInputName.value, phone: editInputPhone.value})
            });

        } else {

            // **Validacion**
let nameAddedValidation = true;
let phoneAddedValidation = true;

const validateAddedInput = (input, regexValidation) => {
    if (nameAddedValidation && phoneAddedValidation) {
        editIcon.classList.remove('no-save');
    } else {
        editIcon.classList.add('no-save');
    }
    if (regexValidation) {
        input.classList.add('correct');
        input.classList.remove('wrong');
    } else {
        input.classList.remove('correct');
        input.classList.add('wrong');
    }};
editInputName.addEventListener('input', e => {
    nameAddedValidation = NAME_REGEX.test(editInputName.value);
    validateAddedInput(editInputName, nameAddedValidation);
});

editInputPhone.addEventListener('input', e => {
    phoneAddedValidation = PHONE_REGEX.test(editInputPhone.value);
    validateAddedInput(editInputPhone, phoneAddedValidation);
});


            // Nueva clase editando para indicar el estado del boton
            editIcon.classList.add('editando');
            // Remuevo el atributo readonly para poder escribir en el input
            editInputPhone.removeAttribute('readonly');
            editInputName.removeAttribute('readonly');
            editInputPhone.classList.add('editing');
            editInputName.classList.add('editing');
            const end = editInputPhone.value.length;
            editInputPhone.setSelectionRange(end, end);
            editInputPhone.focus();
            // Cambio el icono a un lapiz para indicarle al usuario que esta editando
            editIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
            `;
        }        
    }
});

