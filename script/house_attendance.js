function getdata() {
    var data = fetch('https://api.propublica.org/congress/v1/113/house/members.json', {
        headers: { 'X-API-KEY': 'Zqj3AyCtCNdNLZoUHQ3E1YXKVuzH2iOOhzRmms48' }
    }).then(function (res) {
        return res.json()
    }).then(function (data) {
        return data;
    })
    return data;
}
getdata();
var x = getdata();
x.then(res => loadData(res));

function loadData(array) {
    obj = array.results[0].members;
    hvotes();
    glance();
    lvotes();
}

function glance() {
    var democrats = 0;
    var republicans = 0;
    votesrt = 0;
    votesdt = 0;
    votesit = 0;

    for (i = 0; i < obj.length; i++) {
        if (obj[i].party.includes('D')) {
            democrats += 1;
            votesdt += obj[i].votes_with_party_pct;
        } if (obj[i].party.includes('R')) {
            republicans += 1;
            votesrt += obj[i].votes_with_party_pct;
        }
    }
    var votesd = votesdt / democrats; var vdem = votesd.toFixed(2);
    var votesr = votesrt / republicans; var vrep = votesr.toFixed(2);
    var votest = (votesd + votesr) / 2; var vtotal = votest.toFixed(2);
    var taula = [republicans, democrats, vrep, vdem, vtotal];


    var pintartaula = new Vue({
        el: '#glance',
        data: {
            numbers: [],
        }
    });
    pintartaula.numbers = taula;

}
function tenpercent() {
    var tenp = obj.length / 100 * 10;
    var tenpercent = tenp.toFixed(0);
    return tenpercent;
}
function lvotes() {
    var longitud;
    var aux = [];
    menor = obj.sort(function (a, b) { return a.missed_votes_pct - b.missed_votes_pct });
    longitud = tenpercent();
    for (i = 0; i < longitud; i++) {
        aux[i] = menor[i];
    }

    var taula = new Vue({
        el: '#taules',
        data: {
            low: [''],
        }
    });
    taula.low = aux;
}
function hvotes() {
    var longitud;
    var aux = [];
    major = obj.sort(function (a, b) { return (a.missed_votes_pct - b.missed_votes_pct) * -1 });
    longitud = tenpercent();
    for (i = 0; i < longitud; i++) {
        aux[i] = major[i];
    }

    var taulamajor = new Vue({
        el: '#major',
        data: {
            high: [''],
        }
    });
    taulamajor.high = aux;
}
