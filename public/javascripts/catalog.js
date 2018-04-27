


function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function deletePhone(aux){
    // let children = aux.children;
    // console.log();

    // console.log(aux);
    var model = aux.children.item(1).firstChild.getAttribute('placeholder');
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:3000/cellphone/" + model,
        "method": "DELETE",
        "headers": {
          "Cache-Control": "no-cache",
          "Postman-Token": "e6989312-de9e-092e-b5b7-d7d5a506c750"
        }
      }
      
      $.ajax(settings).done(function (response) {
        // console.log(response);
        listar();
      });      
}

function updatePhone(aux){
    var model = aux.children.item(1).firstChild.getAttribute('placeholder');
    // console.log('modelo '+model)
    // aux.children.item(1).firstChild.setAttribute('placeholder','oooooooooooo');
    // console.log(aux);
    // console.log(aux.childNodes);
    aux.childNodes.forEach(element => {
        element.childNodes.forEach( elem2 => {
            // console.log(elem2);
            // console.log(elem2.getAttribute('class'));            
            if(elem2.getAttribute('class') == 'form-control'){
                elem2.disabled = !elem2.disabled;
            }else{
                if(elem2.name == 'up')
                    {if(elem2.innerText == 'Update'){
                        elem2.innerText = 'Enviar';
                    }else{
                        modifyCellphone(aux,model);                        
                    }}
                    // elem2.innerText = ?  'Update':;
                // elem2.setAttribute('onclick','');

            }
            // console.log(elem2.getAttribute('disabled'));
        
        });
    });
    // console.log('update');
    // console.log(model);
     
};

function modifyCellphone(tr,model){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:3000/cellphone/" + model,
        "method": "HEAD",     
        "headers": {
          "Cache-Control": "no-cache"          
        }
      }      
    $.ajax(settings).done(function (response,text,xhr) {
      if(xhr.status == 200){
          settings.data={};
          tr.childNodes.forEach( td =>{
              // if(td.id != "") phone.set(td.id,td.firstChild.value);                    
              if(td.id != "") settings.data[td.id] = td.firstChild.value;
          });
          settings.method = "PUT";
          $.ajax(settings).done(resp =>{ console.log("Enviado"); listar();});
      }        
    }).fail(resp=>{listar();});      
};


 
function listar(){    
    let resp;    
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:3000/cellphone/JSON",
        "method": "GET",
        "headers": {
          "Cache-Control": "no-cache",
          "Postman-Token": "dcb6b3d8-a600-85db-be76-913a36c871d3"
        }
      }
      
      $.ajax(settings).done(function (response) {
          const td_class = "col-xs-2",td_class2 = "col-xs-3",input_class = "form-control", bttn_class = "btn btn-light";
          document.getElementById('list').innerHTML = "";
        // console.log(response);
        response = JSON.parse(response);
        console.log(response);
        for(var i = 0 ; i < response.length ; i++){
            // console.log(response[i]);
            resp = response[i];
            var array = [resp.brand, resp.model, resp.price, resp.release];
            var names = ["brand", "model", "price", "release"];
            let tr = document.createElement('tr'),td,btn_up,btn_del,input;
            // tr.setAttribute("id",resp.model);

            for(var k = 0 ; k < 5; k++){
                td = document.createElement('td');
                td.setAttribute("class",(k == 1? td_class2:td_class));
                if(k == 4) {
                    td.removeAttribute("class"); //intentar remover
                    btn_up = document.createElement('button');
                    btn_up.setAttribute("class",bttn_class);
                    btn_up.setAttribute("name",'up');
                    btn_up.setAttribute("onclick","updatePhone(this.parentElement.parentElement)");
                    btn_up.innerText = "Update";
                    
                    btn_del = document.createElement('button');
                    btn_del.setAttribute("class",bttn_class);
                    btn_del.setAttribute("onclick","deletePhone(this.parentElement.parentElement)");                    
                    btn_del.innerText = "Delete";
                    td.appendChild(btn_up);
                    td.appendChild(btn_del);
                    tr.appendChild(td);
                    

                }else{
                    
                    td.setAttribute("id",names[k]);
                    input = document.createElement('input');
                    input.setAttribute("class",input_class);
                    input.value = array[k];                 
                    input.setAttribute("placeholder",array[k]);
                    input.setAttribute("disabled",true);
                    td.appendChild(input);
                    tr.appendChild(td);
                    
                                 
                }   
            }
            // console.log(tr);
            document.getElementById('list').appendChild(tr);

      

        }
      });
}

