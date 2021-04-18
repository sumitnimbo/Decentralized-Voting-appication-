// window.onload = function() {
//     var chartContainer = $("chartContainer")    
//     var chart = new CanvasJS.Chart("chartContainer", {
//         animationEnabled: true,
//         title: {
//             text: "Election Result"
//         },
//         data: [{
//             type: "pie",
//             startAngle: 240,
//             yValueFormatString: "##0.00\"%\"",
//             indexLabel: "{label} {y}",
//             dataPoints: [
//                 {y: 79.45, label: "Bharatiya Janata Party"},
//                 {y: 7.31, label: "Indian National Congress"},
//                 {y: 7.06, label: "Nationalist Congress Party"},
//                 {y: 4.91, label: ">Shiv Sena"},
//             ]
//         }]
//     });
//     chart.render();
    
//     }
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
var account;
const arr=[];
web3.eth.getAccounts().then((f) => {
 account = f[0];
})

abi = JSON.parse('[{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')

contract = new web3.eth.Contract(abi);
contract.options.address = "0x02cdFA242f22891fD9fFdB6ECeD3e3C18044F699";
// update this contract address with your contract address

candidates = {"Aryan": "candidate-1", "Ishdutt": "candidate-2", "Sumit": "candidate-3"}

// function readCookie(name) {
//     var nameEQ = name + "=";
//     var ca = document.cookie.split(';');
//     for(var i=0;i < ca.length;i++) {
//         var c = ca[i];
//         while (c.charAt(0)==' ') c = c.substring(1,c.length);
//         if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
//     }
//     return null;
// }

// var aadhaar = readCookie('aadhaar');

// var voted = readCookie('voted');
// console.log(voted);
// if(voted==="Yes"+aadhaar)
// {
//     $("#Voting").hide();
//     $("#alreadyVoted").show();
// }


// console.log(aadhaar);

// function voteForCandidate(candidate) {
//  candidateName = $("#candidate").val();
//  console.log(candidateName);

//  contract.methods.voteForCandidate(web3.utils.asciiToHex(candidateName)).send({from: account}).then((f) => {
//   let div_id = candidates[candidateName];
//   contract.methods.totalVotesFor(web3.utils.asciiToHex(candidateName)).call().then((f) => {
//    $("#" + div_id).html(f);
//   })
//  })
//  $("#Voting").hide();
//  $("#alreadyVoted").show();
//  //ADDING THE COOKIE THAT THE PERSON ALREADY VOTED
//  var d = new Date();
//  d.setTime(d.getTime() + (12460601000));
//  var expires = "expires="+ d.toUTCString();
//  document.cookie = 'voted' + "=" + "Yes"+ aadhaar + ";" + expires + ";path=/";
// }

$(document).ready(async function() {
 candidateNames = Object.keys(candidates);

 for(var i=0; i<candidateNames.length; i++) {
 let name = candidateNames[i];
  
 await contract.methods.totalVotesFor(web3.utils.asciiToHex(name)).call().then((f) => {
  arr.push(f); 
//   console.log(arr.length);
 })
 }
 await console.log(arr.length)
 var y1=arr[0];
 var y2=arr[1];
var y3=arr[2];
console.log(y1,y2,y2);
 var chartContainer = $("chartContainer")    
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
            text: "Election Result"
        },
        data: [{
            type: "pie",
            startAngle: 240,
            yValueFormatString: ": ## votes",
            indexLabel: "{label} {y}",
            dataPoints: [
                {y: y1, label: "Aryan"},
                {y: y2, label: "Ishdutt"},
                {y: y3, label: "Sumit"},
           
            ]
        }]
    });
    chart.render();

//  $("#alreadyVoted").hide();
});