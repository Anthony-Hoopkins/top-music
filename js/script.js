addEventListener("DOMContentLoaded",() => {

    const getTop = document.getElementById('get-top');
    const display = document.getElementById('main-display');
    const numberTracks = document.getElementById('number-of-tracks');
    const countrySelect = document.getElementById('country-select');

    numberTracks.addEventListener('change', innerNuberTr);
    countrySelect.addEventListener('change', innerNuberTr);
    getTop.addEventListener('click', innerNuberTr );   

    function innerNuberTr(){
        if (numberTracks.value < 101 && numberTracks.value > 10 ) {
            getTop.innerHTML = `GetTOP ${numberTracks.value}`;
            getTopTracks(countrySelect.value, numberTracks.value);
        }
        else {
            getTop.innerHTML = `GetTOP `;
            getTopTracks(countrySelect.value);
        }
    }

    function getTopTracks(country='Ukraine',lim=10){

        let reqLink = `http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&limit=${lim}&country=${country}&api_key=4c25d8be5fdaa66f43b45133c6db2e9c&format=json`
        
        $.ajax({  
            url: reqLink,            
            type: 'GET',
            dataType: 'json', 
            success: function (data) {
                console.log(data);   
                if (data.error || data.tracks.track.length == 0){                   
                     display.innerHTML = '<h2 class="not-tracks"> There are no top tracks, try to choose another country </h2> ';
                }else {
                    drawTracks(data.tracks.track);
                    drawTrackTitle(data.tracks['@attr']);            
                }           
            }, 
            error: function (e) {    
              console.log('NO success ');
              drawNotTracks();
              console.log(e);             
            }   
        });  

    }

    function drawNotTracks(){
       display.innerHTML = '<h2 className="not-tracks"> There are no top tracks, try to choose another country </h2> ';
    }

    function drawTrackTitle(attr){
        $('#main-display-title').html(`<span> Top ${attr.perPage} in ${attr.country} </span>`);     
    }

    function drawTracks(trackArr){

        display.innerHTML ='';
        let table = document.createElement('table');
        let thElem = document.createElement('table');
        table.className = 'main-table';
        table.appendChild(thElem);

        trackArr.forEach((track, i) =>{

            let trElem = document.createElement('tr');
            trElem.innerHTML = `<td> ${i+1} </td>`;
            track.name ? trElem.innerHTML += `<td title="track name"> ${track.name} </td>`  : trElem.innerHTML +='<td> </td>';
            track.artist.name ? trElem.innerHTML += `<td title="artist"> ${track.artist.name}   </td>`  : trElem.innerHTML +='<td> </td>';
            track.image[1]["#text"] ? trElem.innerHTML += `<td> <img src='${track.image[1]["#text"]}' alt='${track.name}_img'> </td>`  : trElem.innerHTML +='<td> </td>';
            track.url ? trElem.innerHTML += `<td> <a href="${track.url}" target="blank"  title="click to follow the link and listen to this track">
                         listen to this track  </a> </td>` : trElem.innerHTML +='<td> </td>';
            track.listeners ? trElem.innerHTML += `<td  title="listeners" > ${Number(track.listeners).toLocaleString()}</td>`  : trElem.innerHTML +='<td> </td>';
            track.duration !== '0' 
                ? trElem.innerHTML += `<td  title="duration"> ${Math.floor(track.duration/60)} : ${track.duration%60 < 10 ? '0'+track.duration%60 
                : track.duration%60} </td>`  : trElem.innerHTML +='<td> </td>';
            
            table.appendChild(trElem);  

        });

        display.appendChild(table); 
         
    }

    function innerCountry(data){        
        let $selectInp = $('#country-select');
        $selectInp.html('');
        data.forEach(count => $selectInp.append(`<option value="${count.name}">${count.nativeName}</option>`));
    }
   
    (function(){  

        $.ajax({ 
            url: 'https://restcountries.eu/rest/v2/all',            
            type: 'GET',
            dataType: 'json', 
            success: function (data) {                    
                console.log('Success Country ');           
                innerCountry(data);                  
            }, 
            error: function (e) {    
              console.log('NO success ');
              console.log(e);         
            }   
        }); 
        
    }()); // end -  

 });  // end - 



    //  $.ajax({ 
    //     // url: 'http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=4c25d8be5fdaa66f43b45133c6db2e9c&artist=creep&track=radiohead&format=json',            
    //     url: 'http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=4c25d8be5fdaa66f43b45133c6db2e9c&artist=cher&track=believe&format=json',            
    //     type: 'GET',
    //     dataType: 'json', 
    //     success: function (data) {                    
    //         console.log('Success Artist ');   
    //         console.dir(data); 
    //         let trElem = document.createElement('div');
    //         data.name ? trElem.innerHTML += `<div> <audio controls="controls" preload="none" src="${data.name}">  </td>` : '';
    //         display.appendChild(trElem); 
    //     }, 
    //     error: function (e) {    
    //       console.log('NO success ');
    //       console.log(e);         
    //     }   
    // });       