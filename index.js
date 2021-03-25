const core = require("@actions/core");
const github = require("@actions/github");
const isPortReachable = require("is-port-reachable");

async function main(){
	try {
		const inputParameters = {
			ports: core.getInput("port").replace(/\s+/g, ''),
			host: core.getInput("host"),
			needFail: core.getInput("needFail") === 'true',
			reverse: core.getInput("reverse") === 'true'
		}

		const ports = inputParameters.ports.split(',');
		var portsReachable = true;
		ports.forEach(
			(port) => { 
				if(!isPortReachable(port, { host: inputParameters.host })) {
					portsReachable = false
				}
			});

		console.log(`Checking that port${ports.length>0 ? 's': ''} ${inputParameters.ports} ${ports.length>0 ? 'are': 'is'}  ${!inputParameters.reverse ? 'reachable' : 'not reachable'} on host ${inputParameters.host}!`);
		const result = inputParameters.reverse ? !portsReachable : portsReachable;

		core.setOutput("result", result);

		if(inputParameters.needFail) { if (!result) throw new Error(`Port${ports.length>0 ? 's': ''} ${ports} ${ports.length>0 ? 'are': 'is'} ${inputParameters.reverse ? 'reachable' : 'not reachable'} on host ${inputParameters.host}`) }
	  } catch (error) {
		core.setFailed(error.message);
	  }
}


(async () => { await main()} )();