import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const handleChange = (e)=>{
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
        const response = await fetch("http://localhost/QURANPROJ/login.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(formData),
        });
        const result = await response.json();
        if (result.status === "success") {
          setInfo("Login Successeful")
          console.log(result)
          localStorage.setItem('username', result.username);
        } else {
          setError("Login Failed Please Try Again!")
        }
      } catch (error) {
        setError("Server Error Please Try Again Later")
    };
  }
  return (
    <Card className="w-[350px] mx-auto mt-8 ">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4 text-indigo-500">
            <div className="flex flex-col space-y-1.5 text-indigo-500">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="flex flex-col space-y-1.5 text-indigo-500">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
          </div>
          {error && <Alert variant="destructive" className="mt-4"><AlertDescription>{error}</AlertDescription></Alert>}
          {info && <Alert className="mt-4"><AlertDescription>{info}</AlertDescription></Alert>}
          <Button type="submit" className="w-full mt-4 ">Login</Button>
        </form>
      </CardContent>
    </Card>
  );
};
export default Login