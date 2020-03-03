var url = 'https://pokeapi.co/api/v2/pokemon/'
let cache = []

function getDataFromNetwork(url) {
    var req = new Request(url)

    fetch(url)
        .then(Response => Response.json())
        .then(data => {
            cache = data
            let element = document.getElementById('element')
            element.innerHTML += `
        <div>
        <center>
          <table class="table-cont">
            <tr>
              <th>
                <h3> ${data.species.name} </h3>
              <th>
              <tr>
                <td><img src="${data.sprites.front_default}"></img></td>
                <td><p> Type : ${data.types[0].type.name} - ${data.types[1].type.name}</p></td>
                <td><p> Weight : ${data.weight} </p></td>
              </tr>
            </tr>
          </table> </center> <br>
          
          
          
          
        </div>`

        })
        .catch(err => console.log(err))
}

//jala la caché, data
function getDataFromCache(pokemon) {
    if (!('caches' in window)) {
        return null;
    }

    return caches.match(url + pokemon)
        .then((response) => {
            if (response) {
                console.log(response)
                return response.json();
            }
            return null;
        })
        .catch((err) => {
            console.error('Error getting data from cache', err);
            return null;
        });
}

//poke calls
getDataFromCache("blaziken")
getDataFromNetwork(url + "blaziken")
getDataFromCache("decidueye")
getDataFromNetwork(url + "decidueye")
getDataFromCache("infernape")
getDataFromNetwork(url + "infernape")
getDataFromCache("heracross")
getDataFromNetwork(url + "heracross")
getDataFromCache("garchomp")
getDataFromNetwork(url + "garchomp")