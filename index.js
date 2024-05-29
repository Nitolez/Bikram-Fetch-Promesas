//RESUELVE TUS EJERCICIOS AQUI
//Utiliza la API (https://dog.ceo/dog-api/) para resolver estos ejercicios.

/*1: 1.- Declara una funcion **getAllBreeds** que devuelva un array de strings con todas las razas de perro.*/

const getAllBreeds = async () => {
    try {
        const respuesta = await fetch(`https://dog.ceo/api/breeds/list/all`, { method: 'GET' });

        if (respuesta.ok) {
            const data = await respuesta.json();
            return Object.keys(data.message); // Devuelve un array con todas las razas
        } else {
            throw new Error('Error en la respuesta del servidor');
        }
    } catch (error) {
        console.log('Error al obtener las razas:');
    }
};

getAllBreeds()
    .then((razas) => {
        console.log(razas);
    })
    .catch((error) => {
        console.log('Error:');
    });


/*2: Declara una función **getRandomDog** que obtenga una imagen random de una raza.*/

const getRandomDog = async () => {
    try {
        const resp = await fetch(`https://dog.ceo/api/breeds/image/random`, { method: 'GET' })

        if (resp.ok) {
            const data = await resp.json()
            return data.message
        } else {
            throw console.log("Error")
        }
    } catch (err) {
        console.log("Error al obtener imagen")
    }
}

getRandomDog()
    .then((imagen) => { console.log(imagen) })
    .catch((error) => { console.log(error) })


/* 3.- Declara una función **getAllImagesByBreed** que obtenga todas las imágenes de la raza komondor.*/

const getAllImagesByBreed = async () => {
    try {
        const resp = await fetch(`https://dog.ceo/api/breed/komondor/images`, { method: 'GET' })

        if (resp.ok) {
            const data = await resp.json()
            return data.message
        } else {
            throw console.log("Error")
        }
    } catch (err) {
        console.log("Error 2")
    }
}

getAllImagesByBreed()
    .then((imagenes) => { console.log(imagenes) })
    .catch((error) => { console.log(error) })



/*4.- Declara una funcion **getAllImagesByBreed2(breed)** que devuelva las imágenes de la raza pasada por el argumento*/

const getAllImagesByBreed2 = async (breed) => {
    try {
        const resp = await fetch(`https://dog.ceo/api/breed/` + breed + `/images`, { method: 'GET' })

        if (resp.ok) {
            const data = await resp.json()
            return data.message
        } else {
            throw console.log("Error")
        }
    } catch (err) {
        console.log("Error 2")
    }
}

getAllImagesByBreed2('corgi')
    .then((imagenes) => { console.log(imagenes) })
    .catch((error) => { console.log(error) })



/* 5: Declarara una función **getGitHubUserProfile(username)** que obtenga el perfil de usuario de github a partir de su nombre de usuario. 
(https://api.github.com/users/{username}).*/

const getGitHubUserProfile = async (username) => {
    try {
        const resp = await fetch(`https://api.github.com/users/${username}`, { method: 'GET' })

        if (resp.ok) {
            const data = await resp.json()
            return data
        } else {
            throw console.log("Error")
        }
    } catch (err) {
        console.log("Error 2")
    }
}

getGitHubUserProfile('Nitolez')
    .then((perfil) => { console.log(perfil) })
    .catch((error) => { console.log(error) })


/* 6.- Declara una función **printGithubUserProfile(username)** que reciba como argumento el nombre de un usuario 
(username), retorne {img, name} y pinte la foto y el nombre en el DOM.*/


const printGithubUserProfile = async (username) => {
    try {
        const resp = await fetch(`https://api.github.com/users/${username}`, { method: 'GET' })

        if (resp.ok) {
            const data = await resp.json()
            console.log(data);
            const divImg = document.querySelector("#imagen")
            const crearAvatar = document.createElement('img')
            const crearNombre = document.createElement('h2')
            const avatar = data.avatar_url
            const name = data.name

            crearAvatar.src = avatar
            crearNombre.innerText = name

            divImg.append(crearAvatar)
            divImg.append(crearNombre)

            return { avatar_url: avatar, name };
        } else {
            throw console.log("Error")
        }
    } catch (err) {
        console.log("Error 2")
    }
}

/* printGithubUserProfile('Nitolez')
    .then((perfil) => {console.log(perfil)})
    .catch((error) => {console.log(error)}) */


/* 7. Crea una función **getAndPrintGitHubUserProfile(username)** que contenga una petición a la API 
para obtener información de ese usuario y devuelva un string que represente una tarjeta HTML como en el ejemplo, 
la estructura debe ser exactamente la misma:

```html
<section>
    <img src="url de imagen" alt="imagen de usuario">
    <h1>Nombre de usuario</h1>
    <p>Public repos: (número de repos)</p>
</section>
```*/

const getAndPrintGitHubUserProfile = async (username) => {
    try {
        const resp = await fetch(`https://api.github.com/users/${username}`, { method: 'GET' });

        if (resp.ok) {
            const data = await resp.json();

            const { avatar_url, public_repos, name } = data;
            const displayName = name || username;

            const htmlString = `<section>
                                    <img src="${avatar_url}" alt="${displayName}">
                                    <h1>${displayName}</h1>
                                    <p>Public repos: ${public_repos}</p>
                                </section>`;

            const tarjeta = document.querySelector("#tarjeta");
            tarjeta.innerHTML = htmlString;

            return htmlString;
        } else {
            console.log("Error.");
        }
    } catch (error) {
        console.log("Error 2");
    }
}

/*
getAndPrintGitHubUserProfile('Nitolez')
    .then((perfil) => { console.log(perfil) })
    .catch((error) => { console.log(error) })*/


/*9.- Dada una lista de usuarios de github guardada en una array,crea una funcion **fetchGithubUsers(userNames)** 
que utilice 'https://api.github.com/users/${name}' para obtener el nombre de cada usuario. \
Objetivo: Usar Promise.all()\
Recordatorio: Una llamada a fetch() devuelve un objeto promesa.\
Pregunta. ¿cuántas promesas tendremos?

Hasta que no se resuelvan todas las promesas desencadenadas por cada fetch(), no se cargarán los datos.

Pasos:

- Mapear el array y hacer un fetch() para cada usuario. Esto nos de vuelve un array lleno de promesas.
- Con Promise.all() harás que se tenga que resolver todo el proceso de peticiones a GitHub a la vez.
- Cuando Promise.all() haya terminado:
Consigue que se imprima por consola la url del repositorio de cada usuario.
Consigue que se imprima por consola el nombre de cada usuario.*/

const fetchGithubUsers = async (userNames) => {
    try {
        const promises = userNames.map(username => fetch(`https://api.github.com/users/${username}`, { method: 'GET' }))
        const promesasJuntas = await Promise.all(promises)
        //Promise.all() devuelve un único Promise
        const data = promesasJuntas.map(response => {
            if (!response.ok) {
                throw new Error(`Error fetching data for user: ${response.url}`);
            }
            return response.json();
        });

        const usersData = await Promise.all(data);

        usersData.forEach(user => {
            console.log(`URL de repositorio: ${user.repos_url}`);
            console.log(`Username: ${user.name || user.login}`);
        });
    } catch (error) {
        console.error('Error fetching GitHub users:', error);
    }
}