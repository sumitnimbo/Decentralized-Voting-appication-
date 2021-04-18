web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
var account;
var hasVoted = false ;
var verifiedUser = readCookie('verifiedUser');

var adharNumber = readCookie('aadhaar');
web3.eth.getAccounts().then((f) => {
 account = f[0];
})

// abi = JSON.parse('[{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')
abi = JSON.parse('[{"inputs":[{"internalType":"bytes32[]","name":"candidateNames","type":"bytes32[]"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"addAdhar","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"candidateList","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"votedornot","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]')
contract = new web3.eth.Contract(abi);
contract.options.address = "0x02cdFA242f22891fD9fFdB6ECeD3e3C18044F699";
// update this contract address with your contract address

candidates = {"Aryan": "candidate-1", "Ishdutt": "candidate-2", "Sumit": "candidate-3"}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

// var aadhaar = readCookie('aadhaar');

// var voted = readCookie('voted');

// console.log(voted);
// if(voted==="Yes"+aadhaar)
// {
//     $("#Voting").hide();
//     $("#alreadyVoted").show();
// }


console.log(adharNumber);

async function voteForCandidate(candidate) {
 candidateName = $("#candidate").val();
 console.log(candidateName);

 await contract.methods.voteForCandidate(web3.utils.asciiToHex(candidateName)).send({from: account}).then((f) => {
//   let div_id = candidates[candidateName];
//   contract.methods.totalVotesFor(web3.utils.asciiToHex(candidateName)).call().then((f) => {
//    $("#" + div_id).html(f);
//   })
console.log(f);
 })
console.log(contract.methods.voteForCandidate)
await contract.methods.addAdhar(adharNumber).send({from: account}).then((f) => {
    console.log(f);
   })


 $("#Voting").hide();
 $("#alreadyVoted").show();
 $("#resultSection").show();
 $("#notVerified").hide();

 $("#resultInfo").hide();

 //ADDING THE COOKIE THAT THE PERSON ALREADY VOTED
 var d = new Date();
//  d.setTime(d.getTime() + (12460601000));
//  var expires = "expires="+ d.toUTCString();
//  document.cookie = 'voted' + "=" + "Yes"+ aadhaar + ";" + expires + ";path=/";
}

$(document).ready(function() {

contract.methods.votedornot(adharNumber).call().then((f) => {
  hasVoted = f ;
  console.log(hasVoted)
  console.log("verified user :" + verifiedUser)
  if(hasVoted){
    $("#alreadyVoted").show();
    $("#resultSection").show();
    $("#resultInfo").hide();
    $("#notVerified").hide();

    $("#Voting").hide();
    console.log("verified user if wala:" + verifiedUser)
    // console.log(hasVoted)

} else {
    if(verifiedUser){
        $("#alreadyVoted").hide();
        $("#notVerified").show();

        $("#resultSection").show();
        $("#resultInfo").hide();
        $("#Voting").hide();
        console.log("else if wala")
    } else {
        $("#alreadyVoted").hide();
        $("#resultSection").hide();
        $("#notVerified").hide();

        $("#resultInfo").show();
        $("#Voting").show();
        // console.log("else wala " + verifiedUser)
        // console.log(hasVoted)
        console.log("else else wala")

    }


}

 })

//  console.log(hasVoted)
//  if(hasVoted){
//     $("#alreadyVoted").show();
//     $("#resultSection").show();
//     $("#resultInfo").hide();


// } else {
//     $("#alreadyVoted").hide();
//     $("#resultSection").hide();
//     $("#resultInfo").show();

// }

});