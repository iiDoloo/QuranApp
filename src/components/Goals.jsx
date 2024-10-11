import { TrendingUp } from "lucide-react"
import { useState, useEffect } from "react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
export const description = "A radial chart with text"


const Goals = () => {
  const [goal,setGoal] = useState(0)
  const [progress,setProgress] = useState("")
  const [userData, setUserData] = useState("");
  const [userDataa, setUserDataa] = useState({ name: '' });
  
  const chartData = [
    { browser: "safari", visitors: progress, fill: "var(--color-safari)" },
  ]
  const chartConfig = {visitors: {
      label: "Visitors",},
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
  }

  useEffect(() => {
    const userName = localStorage.getItem('username');

    if (userName) {
      setUserData(userName);
      setUserDataa({ name: userName });
        fetch("http://localhost/QURANPROJ/getUser.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(userDataa),
        }).then((response)=>response.json())
        .then((data) => {
          setProgress(data.progress);
          console.log(data);
        })
        .catch((error) => {
          setError(error);
        });
      
    } else {
      window.location.href = '/login';
    }
  }, [progress]);
  return(
    
      <Card className="flex flex-col">
        
        <CardHeader className="items-center pb-0">
          <CardTitle>Assalamu alaikum <span className="text-indigo-500">{userData}</span></CardTitle>
          <CardTitle>Quran Reading Progress </CardTitle>
          <CardDescription>January - December 2024</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <RadialBarChart
              data={chartData}
              startAngle={0}
              endAngle={10}
              innerRadius={80}
              outerRadius={110}
            >
              <PolarGrid
                gridType="circle"
                radialLines={false}
                stroke="none"
                className="first:fill-muted last:fill-background"
                polarRadius={[86, 74]}
              />
              <RadialBar dataKey="visitors" background cornerRadius={10} />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-4xl font-bold"
                          >
                            {chartData[0].visitors.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Listenings
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </PolarRadiusAxis>
            </RadialBarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="leading-none text-muted-foreground">
            Showing Ayaths Listened to during this year
          </div>
        </CardFooter>
      </Card>
    )
  }

export default Goals;