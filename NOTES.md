BACKLOG
----- implement an example of saga that has chorography with multiple microservice boundries
------- failure tolerant system
------- pending state
------- decider, state machine like data-transaction management(?)
----- create terraform
----- create DOCKERFILE as prod
----- re-init CHANGELOG
----- clear, fix common eslint config
----- fix test file errors at web-utils package
----- add manypkg check script to CI & CD
----- concentrate tailwindcss, ts and eslint configs, and apply them properly
----- collect config files and extend them from config package. Eslint, tsconfig
----- tailwindcss config should be scalable and compositable
----- start to planning projects
----- activate changeset
----- fix github workflows
----- add "tsc --noEmit" for typecheck script (package.json-?, github workflow)
----- rearrange dependency lists of apps, packages
----- add nvm

SELECTED
----- add api env config validation
----- add CQRS stuff
------+ partially added, command-side added
------+ need: EventStoreDB, stream of events from EventStoreDB to MongoDB as synchronization of write-to-read,

DONE
+++++ add package.json attributes of OpenSource stuff. Like author, repo, licence (look into nestjs project packages)
+++++ add options to package.json as author, git, licence...
+++++ clear rollup dependencies
+++++ create api-utils package
+++++ add grpc and kafka config as env
+++++ add database as mongodb
+++++ add mongodb url as env variable
+++++ reconfigure turbo output options for performance
+++++ implement manypkg for sync of versions of dependencies at whole monorepo
+++++ clean deprecated dependencies
+++++ remove stats file from ui package
+++++ remove tsconfig.dev.json file from ui package
+++++ clear README files
+++++ concentrate storybook files at storybook lib
+++++ disable rollup .cache at node_modules
