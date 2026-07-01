---
url: /plugins/markdown/markdown-chart/plantuml.md
---
# PlantUML

Add [PlantUML][] support to the Markdown files in your VuePress site.

[plantuml]: https://plantuml.com/

## Installation

You can enable this feature via:

```ts {7} title=".vuepress/config.ts"
import { markdownChartPlugin } from '@vuepress/plugin-markdown-chart'

export default {
  plugins: [
    markdownChartPlugin({
      // Enable PlantUML
      plantuml: true,
    }),
  ],
}
```

## Syntax

You can insert the same content that [plantuml][] supports, for example:

```md
@startuml
content
@enduml
```

## Demo

::: preview Sequence Diagram

@startuml
Alice -> Bob: Authentication Request

alt successful case

```
Bob -> Alice: Authentication Accepted
```

else some kind of failure

```
Bob -> Alice: Authentication Failure
group My own label
Alice -> Log : Log attack start
    loop 1000 times
        Alice -> Bob: DNS Attack
    end
Alice -> Log : Log attack end
end
```

else Another type of failure

Bob -> Alice: Please repeat

end
@enduml

:::

::: preview Use Case

@startuml
:Main Admin: as Admin
(Use the application) as (Use)

User -> (Start)
User --> (Use)

Admin ---> (Use)

note right of Admin : This is an example.

note right of (Use)
A note can also
be on several lines
end note

note "This note is connected\nto several objects." as N2
(Start) .. N2
N2 .. (Use)
@enduml

:::

::: preview Class

@startuml
abstract class AbstractList
abstract AbstractCollection
interface List
interface Collection

List <|-- AbstractList
Collection <|-- AbstractCollection

Collection <|- List
AbstractCollection <|- AbstractList
AbstractList <|-- ArrayList

class ArrayList {
Object\[] elementData
size()
}

enum TimeUnit {
DAYS
HOURS
MINUTES
}

annotation SuppressWarnings

annotation Annotation {
annotation with members
String foo()
String bar()
}
@enduml

:::

::: preview Activity

@startuml
start
:ClickServlet.handleRequest();
:new page;
if (Page.onSecurityCheck) then (true)
:Page.onInit();
if (isForward?) then (no)
:Process controls;
if (continue processing?) then (no)
stop
endif

```
if (isPost?) then (yes)
  :Page.onPost();
else (no)
  :Page.onGet();
endif
:Page.onRender();
```

endif
else (false)
endif

if (do redirect?) then (yes)
:redirect process;
else
if (do forward?) then (yes)
:Forward request;
else (no)
:Render page template;
endif
endif

stop
@enduml

:::

::: preview Component

@startuml
package "Some Group" {
HTTP - \[First Component]
\[Another Component]
}

node "Other Groups" {
FTP - \[Second Component]
\[First Component] --> FTP
}

cloud {
\[Example 1]
}

database "MySql" {
folder "This is my folder" {
\[Folder 3]
}
frame "Foo" {
\[Frame 4]
}
}

\[Another Component] --> \[Example 1]
\[Example 1] --> \[Folder 3]
\[Folder 3] --> \[Frame 4]

@enduml

:::

::: preview State

@startuml
state start1  <>
state choice1 <>
state fork1   <>
state join2   <>
state end3    <>

\[\*]     --> choice1 : from start\nto choice
start1  --> choice1 : from start stereo\nto choice

choice1 --> fork1   : from choice\nto fork
choice1 --> join2   : from choice\nto join
choice1 --> end3    : from choice\nto end stereo

fork1   ---> State1 : from fork\nto state
fork1   --> State2  : from fork\nto state

State2  --> join2   : from state\nto join
State1  --> \[\*]     : from state\nto end

join2   --> \[\*]     : from join\nto end
@enduml

:::

::: preview Object

@startuml
object London
object Washington
object Berlin
object NewYork

map CapitalCity {
UK \*-> London
USA \*--> Washington
Germany \*---> Berlin
}

NewYork --> CapitalCity::USA
@enduml

:::

::: preview Deployment

@startuml
node node1
node node2
node node3
node node4
node node5
node1 -- node2 : label1
node1 .. node3 : label2
node1 ~~ node4 : label3
node1 == node5
@enduml

:::

::: preview Timing

@startuml
scale 5 as 150 pixels

clock clk with period 1
binary "enable" as en
binary "R/W" as rw
binary "data Valid" as dv
concise "dataBus" as db
concise "address bus" as addr

@6 as :write\_beg
@10 as :write\_end

@15 as :read\_beg
@19 as :read\_end

@0
en is low
db is "0x0"
addr is "0x03f"
rw is low
dv is 0

@:write\_beg-3
en is high
@:write\_beg-2
db is "0xDEADBEEF"
@:write\_beg-1
dv is 1
@:write\_beg
rw is high

@:write\_end
rw is low
dv is low
@:write\_end+1
rw is low
db is "0x0"
addr is "0x23"

@12
dv is high
@13
db is "0xFFFF"

@20
en is low
dv is low
@21
db is "0x0"

highlight :write\_beg to :write\_end #Gold:Write
highlight :read\_beg to :read\_end #lightBlue:Read

db@:write\_beg-1 <-> @:write\_end : setup time
db@:write\_beg-1 -> addr@:write\_end+1 : hold
@enduml

:::

::: preview RegExp

@startregex
/\<style(\s*lang=(\['"])(.*?)\2)?\s\*(?:scoped)?>(\[\s\S]+)\</style>
@endregex

:::

::: preview Network

@startuml
nwdiag {
group nightly {
color = "#FFAAAA";
description = "<\&clock> Restarted nightly <\&clock>";
web02;
db01;
}
network dmz {
address = "210.x.x.x/24"

```
  user [description = "<&person*4.5>\n user1"];
  web01 [address = "210.x.x.1, 210.x.x.20",  description = "<&cog*4>\nweb01"]
  web02 [address = "210.x.x.2",  description = "<&cog*4>\nweb02"];
```

}
network internal {
address = "172.x.x.x/24";

```
  web01 [address = "172.x.x.1"];
  web02 [address = "172.x.x.2"];
  db01 [address = "172.x.x.100",  description = "<&spreadsheet*4>\n db01"];
  db02 [address = "172.x.x.101",  description = "<&spreadsheet*4>\n db02"];
  ptr  [address = "172.x.x.110",  description = "<&print*4>\n ptr01"];
```

}
}
@enduml

:::

::: preview Salt

@startsalt
{+
{/ General | Fullscreen | Behavior | Saving }
{
{ Open image in: | ^Smart Mode^ }
\[X] Smooth images when zoomed
\[X] Confirm image deletion
\[ ] Show hidden images
}
\[Close]
}
@endsalt

:::

::: preview Archimate

@startuml
skinparam rectangle<> {
roundCorner 25
}
sprite $bProcess jar:archimate/business-process
sprite $aService jar:archimate/application-service
sprite $aComponent jar:archimate/application-component

rectangle "Handle claim"  as HC <<$bProcess>><> #Business
rectangle "Capture Information"  as CI <<$bProcess>><> #Business
rectangle "Notify\nAdditional Stakeholders" as NAS <<$bProcess>><> #Business
rectangle "Validate" as V <<$bProcess>><> #Business
rectangle "Investigate" as I <<$bProcess>><> #Business
rectangle "Pay" as P <<$bProcess>><> #Business

HC \*-down- CI
HC \*-down- NAS
HC \*-down- V
HC \*-down- I
HC \*-down- P

CI -right->> NAS
NAS -right->> V
V -right->> I
I -right->> P

rectangle "Scanning" as scanning <<$aService>><> #Application
rectangle "Customer admnistration" as customerAdministration <<$aService>><> #Application
rectangle "Claims admnistration" as claimsAdministration <<$aService>><> #Application
rectangle Printing <<$aService>><> #Application
rectangle Payment <<$aService>><> #Application

scanning -up-> CI
customerAdministration  -up-> CI
claimsAdministration -up-> NAS
claimsAdministration -up-> V
claimsAdministration -up-> I
Payment -up-> P

Printing -up-> V
Printing -up-> P

rectangle "Document\nManagement\nSystem" as DMS <<$aComponent>> #Application
rectangle "General\nCRM\nSystem" as CRM <<$aComponent>>  #Application
rectangle "Home & Away\nPolicy\nAdministration" as HAPA <<$aComponent>> #Application
rectangle "Home & Away\nFinancial\nAdministration" as HFPA <<$aComponent>>  #Application

DMS .up.|> scanning
DMS .up.|> Printing
CRM .up.|> customerAdministration
HAPA .up.|> claimsAdministration
HFPA .up.|> Payment

legend left
Example from the "Archisurance case study" (OpenGroup).
See
===

# <$bProcess> :business process

# <$aService> : application service

<$aComponent> : application component
endlegend
@enduml

:::

::: preview Gantt

@startgantt

Project starts the 2020-12-01

\[Task1] requires 10 days
sunday are closed

note bottom
memo1 ...
memo2 ...
explanations1 ...
explanations2 ...
end note

\[Task2] requires 20 days
\[Task2] starts 10 days after \[Task1]'s end
\-- Separator title --
\[M1] happens on 5 days after \[Task1]'s end

\-- end --
@endgantt

:::

::: preview Mindmap

@startmindmap
caption figure 1
title My super title

* <\&flag>Debian
  \*\* <\&globe>Ubuntu
  \*\*\* Linux Mint
  \*\*\* Kubuntu
  \*\*\* Lubuntu
  \*\*\* KDE Neon
  \*\* <\&graph>LMDE
  \*\* <\&pulse>SolydXK
  \*\* <\&people>SteamOS
  \*\* <\&star>Raspbian with a very long name
  \*\*\* Raspmbc => OSMC
  \*\*\* Raspyfi => Volumio

header
My super header
endheader

center footer My super footer

legend right
Short
legend
endlegend
@endmindmap

:::

::: preview WBS

@startwbs

* New Job
  ++ Decide on Job Requirements
  +++ Identity gaps
  +++ Review JDs
  ++++ Sign-Up for courses
  ++++ Volunteer
  ++++ Reading
  ++- Checklist
  +++- Responsibilities
  +++- Location
  ++ CV Upload Done
  +++ CV Updated
  ++++ Spelling & Grammar
  ++++ Check dates
  \---- Skills
  +++ Recruitment sites chosen
  @endwbs

:::

::: preview JSON

@startjson
\#highlight "lastName"
\#highlight "address" / "city"
\#highlight "phoneNumbers" / "0" / "number"
{
"firstName": "John",
"lastName": "Smith",
"isAlive": true,
"age": 28,
"address": {
"streetAddress": "21 2nd Street",
"city": "New York",
"state": "NY",
"postalCode": "10021-3100"
},
"phoneNumbers": \[
{
"type": "home",
"number": "212 555-1234"
},
{
"type": "office",
"number": "646 555-4567"
}
],
"children": \[],
"spouse": null
}
@endjson

:::

::: preview YAML

@startyaml
doe: "a deer, a female deer"
ray: "a drop of golden sun"
pi: 3.14159
xmas: true
french-hens: 3
calling-birds:
\- huey
\- dewey
\- louie
\- fred
xmas-fifth-day:
calling-birds: four
french-hens: 3
golden-rings: 5
partridges:
count: 1
location: "a pear tree"
turtle-doves: two
@endyaml

:::
