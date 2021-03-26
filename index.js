const core = require("@actions/core");
const github = require("@actions/github");
const isPortReachable = require("is-port-reachable");

async function main(){
	try {
		const inputParameters = {
			ports: core.getInput("port").replace(/\s+/g, ''),
			host: core.getInput("host"),
			needFail: core.getInput("needFail") === 'true',
			reverse: core.getInput("reverse") === 'true',
			pause: core.getInput("pause")
		}

		const ports = inputParameters.ports.split(',');

		if(ports.length == 0) { throw new Error("There is no one port found")}

		await new Promise(resolve => setTimeout(resolve, inputParameters.pause));

		const portsReachableArray = await Promise.all( ports.map( async (port) => { 
			const r = await isPortReachable(port, { host: inputParameters.host })
			console.log(`* Port ${port} opened: ${r}`)
			return inputParameters.reverse ? !r : r
		}));

		console.log(portsReachableArray);

		const result = portsReachableArray.every(v => v === true);

		console.log(`Checking that port${ports.length>0 ? 's': ''} ${inputParameters.ports} ${ports.length>0 ? 'are': 'is'}  ${!inputParameters.reverse ? 'reachable' : 'not reachable'} on host ${inputParameters.host}!`);

		core.setOutput("result", result);

		if(inputParameters.needFail) { if (!result) throw new Error(`Port${ports.length>0 ? 's': ''} ${ports} ${ports.length>0 ? 'are': 'is'} ${inputParameters.reverse ? 'reachable' : 'not reachable'} on host ${inputParameters.host}`) }
	  } catch (error) {
		core.setFailed(error.message);
	  }
}


(async () => { await main()} )();