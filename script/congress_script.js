function getdata () {
    var data = fetch ('https://api.propublica.org/congress/v1/113/house/members.json', {
    headers:{'X-API-KEY': 'Zqj3AyCtCNdNLZoUHQ3E1YXKVuzH2iOOhzRmms48'}
    }).then(function(res){
        return res.json()
    }).then(function(data){
        return data;
    })
    return data;
}
getdata();
var x = getdata();
x.then(res=> loadData(res));

function loadData(array) {
    obj = array.results[0].members;
    states();
    callstates();
    createtable();
}
    
var party = [''];
var pstate =[''];

var app = new Vue({
    el: '#general',
       data: {
           senators: [],
           statelist: [],
       },
   });
function createtable() {
    app.senators = [''];
    for (i=0; i < obj.length; i++) {
        if (obj[i].state == pstate || pstate == 'All'){
            if (obj[i].party=='R' && party.includes('R') || obj[i].party=='D' && party.includes('D')
            || !party.includes("R") && !party.includes("D")) {
                app.senators.push(obj[i]);
            }
        } 
    } 
}
function parties() {
    party=[''];
    var aux = document.querySelectorAll('input[type=checkbox]:checked');
    for (var i = 0; i < aux.length; i++) {
        party[i]=aux[i].value;
    }
    createtable();
}
function states() {
    pstate =[''];
    var aux = document.querySelectorAll('option:checked');
    for (var i=0; i<aux.length; i++) {
        pstate[i]=aux[i].value;
    }
    createtable();
}
function callstates() {
    var state = [];
    app.statelist= [''];
    for (i=0; i < obj.length; i++) {
        for (var y=0; y<obj.length; y++) {
            if (obj[i].state == obj[y].state && i==y) {
                if(!state.includes(obj[y].state)) {
                    state.push(obj[i].state);
                }
                app.statelist = state;
            }
        }
    }
}

document.getElementById("republican").addEventListener("click", parties);
document.getElementById("democrat").addEventListener("click", parties);
document.getElementById("ddfilter").addEventListener("change", states);
