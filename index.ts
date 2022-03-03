import * as pulumi from "@pulumi/pulumi";
import * as resources from "@pulumi/azure-native/resources";
import * as sql from "@pulumi/azure-native/sql";

// Get the password to use for SQL from config.
const config = new pulumi.Config();
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
        "Code": "Totalsoft"
    },
    {
        "TenantId": "da84628a-2925-4b69-9116-a90dd5a72b1f",
        "Code": "DEV"
    }
]

tenants.forEach(tenant=> {
    if (tenant.Apps?.includes("nginx")) {

        // Create an Azure Resource Group
        const resourceGroup = new resources.ResourceGroup(`${tenant.Code}resourceGroup`);

        const sqlServer = new sql.Server("sqlserver", {
            resourceGroupName: resourceGroup.name,
            administratorLogin: username,
            administratorLoginPassword: pwd,
            version: "12.0",
        });

        const database = new sql.Database(`${tenant.Code}nginxdb`, {
            resourceGroupName: resourceGroup.name,
            serverName: sqlServer.name,
            sku: {
                name: "S0",
            },
        });
    }
});
