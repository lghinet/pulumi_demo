//import { Config } from "@pulumi/pulumi";
//import * as pulumi from "@pulumi/pulumi";
import * as resources from "@pulumi/azure-native/resources";
import * as sql from "@pulumi/azure-native/sql";
//import * as kube from "@pulumi/kubernetes";
//import * as kubex from "@pulumi/kubernetesx";

// Get the password to use for SQL from config.


//const config = new Config();

const pwd = "sqlPasswo234@#$@#$@#$44rd";
const username = "pulumi";

const tenants = [
    {
        "TenantId": "68a448a2-e7d8-4875-8127-f18668217eb6",
        "Code": "QA",
        "Apps": [
            "nginx"
        ]
    },
    {
        "TenantId": "ba5ff8f4-ac8f-4f73-898a-5e4a6babdd46",
        "Code": "Totalsoft",
        "Apps": [
            "nginx2"
        ]
    },
    {
        "TenantId": "da84628a-2925-4b69-9116-a90dd5a72b1f",
        "Code": "DEV",
        "Apps": [
            "nginx2"
        ]
    }
]

tenants.forEach(tenant=> {
    
    if (tenant.Apps?.includes("nginx")) {

        const code = tenant.Code.toLowerCase()
        // Create an Azure Resource Group
        const resourceGroup = new resources.ResourceGroup(`pulumi_${code}_RG`);

        const sqlServer = new sql.Server(`${code}-sqlserver`, {
            resourceGroupName: resourceGroup.name,
            administratorLogin: username,
            administratorLoginPassword: pwd,
            version: "12.0",
        });

        const database = new sql.Database(`${code}-nginxdb`, {
            resourceGroupName: resourceGroup.name,
            serverName: sqlServer.name,
            sku: {
                name: "S0",
            },
        });
    }
});
