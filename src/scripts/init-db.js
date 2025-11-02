"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var turso_1 = require("../lib/turso");
// Run the initialization
(0, turso_1.initializeDatabase)()
    .then(function () {
    console.log("✅ Database tables created successfully!");
    process.exit(0);
})
    .catch(function (error) {
    console.error("❌ Failed to initialize database:", error);
    process.exit(1);
});
