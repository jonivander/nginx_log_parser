# nginx convert and query

Please create a CLI program to process and query nginx access logs in the manner described below. This folder contains an [nginx access log](access.log) with 3 days of log entries that you should use as your sample data.
 
## Step 1. Process

In your CLI program, create a subcommand to parse the nginx access log and convert the log entries to JSON according to [the included JSON schema](logs.schema.json). Output the JSON to a user specified file.  
An example of what this could look like if the name of your program was `nginxcli`:

```text
nginxcli convert access.log access.json
Log entries from access.log successfully converted to JSON and stored in access.json
```

## Step 2. Query

Create two more subcommands that will parse the JSON file created by the subcommand in Step 1. The first (let's call it "ua"), will allow the user to query for the most popular user agent on a given day and get the number of hits to the site it was used for. Example:

```text
nginxcli ua access.json 08/Nov/2020
Mozilla/5.0 (some browser and version) (12932)
```

The output above is an example showing that by using the data in `access.json`, the program determined that "Mozilla/5.0 (some browser and version)" was the most popular user agent on Nov. 8th, and was used in 12,932 hits to the site on that day. This is just an example and isn't specifying the correct answer or dictating the format you must use.

The second subcommand (let's call it "hits"), will allow the user to query for the most popular HTTP method + path requested on a given day and also return the number of times it appears in the access data for that day. Example:

```text
nginxcli hits access.json 10/Nov/2020
GET /somepath (91356)
```

The output above is an example showing that "GET /somepath" was the most popular request to the site (which occurred 91,356 times) on Nov. 10th, 2020. Again, this is an example and isn't specifying the correct answer or dictating the output format you must use.

## Programmer and operational requirements

You may use the programming or scripting language of your choice (including any modules, frameworks, standard command line tools, etc.), however, your code must be buildable and runable in a modern macOS or Windows environment (or in a container that can run in one of those environments). Please include instructions and requirements that someone would need to run your solution, and any other documentation or extra material you would include if you were building this for a client.

## Submission

Please create a Git repository with your solution. Zip up the Git repository containing your solution and return to Slalom.
