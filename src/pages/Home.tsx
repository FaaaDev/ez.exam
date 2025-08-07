"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  Zap,
  Star,
  ArrowRight,
  Play,
  CheckCircle,
  TrendingUp,
  Brain,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const testimonials = [
    {
      name: "Sarah",
      location: "Kuala Lumpur",
      text: "This app really makes studying fun! The interactive quizzes help me understand better.",
      rating: 5,
    },
    {
      name: "Ahmad",
      location: "Johor Bahru",
      text: "I improved my grades significantly after using this app for just 2 weeks!",
      rating: 5,
    },
    {
      name: "Mei Lin",
      location: "Penang",
      text: "The explanations are so clear and the animations make learning enjoyable.",
      rating: 5,
    },
  ];

  const features = [
    {
      icon: Target,
      title: "Find Weak Spots",
      description:
        "Quick 5-minute assessment to identify areas for improvement",
      color: "gradient-orange",
    },
    {
      icon: Zap,
      title: "Interactive Learning",
      description: "Engaging quizzes with instant feedback and explanations",
      color: "gradient-blue",
    },
    {
      icon: TrendingUp,
      title: "Track Progress",
      description: "Monitor your improvement with detailed analytics",
      color: "gradient-green",
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 lg:px-20 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#ff6b35] rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">Ez.Exam</span>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="hidden sm:flex h-8 mt-2">
              🇬🇧 English
            </Badge>
            {/* <a href="/dashboard"> */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/dashboard")}
            >
              Sign In
            </Button>
            {/* </a> */}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 lg:px-20 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div
            className={`relative lg:hidden ${
              isVisible ? "animate-bounce-in" : "opacity-0"
            }`}
          >
            <div className="flex w-full mx-auto justify-center">
              <div className="absolute inset-0 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
              <img
                src="https://upload.faaadev.cloud/upload/mumet_3d.png"
                alt="Ez.Exam Mascot"
                className="relative z-10 w-170"
              />
            </div>
          </div>
          <div
            className={`space-y-6 ${
              isVisible ? "animate-slide-up" : "opacity-0"
            }`}
          >
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              ✨ Study Smart, Not Hard
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Exams can be super stressful, especially when you don't know where
              to start
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Ez.Exam finds your weak spots in 15 mins and helps you drill smart
              with interactive quizzes - just like A+ students do.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant={"default"}
                size="lg"
                className="w-full sm:w-auto gradient-orange text-white border-0 transition-transform"
                onClick={() => navigate("/quiz")}
              >
                <Play className="w-5 h-5 mr-2" />
                Start Learning Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => navigate("/dashboard")}
              >
                View Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
          <div
            className={`relative hidden lg:block ${
              isVisible ? "animate-bounce-in" : "opacity-0"
            }`}
          >
            <div className="relative w-full mx-auto">
              <div className="absolute inset-0 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
              <img
                src="https://upload.faaadev.cloud/upload/mumet_3d.png"
                alt="Ez.Exam Mascot"
                className="relative z-10 w-170"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 lg:px-20 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How Ez.Exam Helps You Study Better
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Want better results? Ez.Exam shows you what to focus on to get you
            from your current score to your target score
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`${
                isVisible ? "animate-slide-up" : "opacity-0"
              } hover:scale-105 transition-all duration-300 border-0 shadow-lg`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-4 text-center">
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-gray-600">
              15-min diagnosis of your weak areas
            </span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-gray-600">
              Step-by-step explanations to fix mistakes
            </span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-gray-600">
              Unlimited practice with instant feedback
            </span>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Real Students, Real Results
            </h2>
            <p className="text-lg text-gray-600">
              More than 500 students have tried Ez.Exam to improve their grades.
              <br />
              Let's hear from your peers!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className={`${
                  isVisible ? "animate-slide-up" : "opacity-0"
                } hover:shadow-lg transition-all duration-300`}
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {testimonial.location}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#ffc7b3] py-16">
        <div className="container mx-auto px-4 lg:px-20 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#ff4400] mb-4">
              Ready to Study Smarter?
            </h2>
            <p className="text-xl text-[#ff4400] mb-8">
              Find your weak spots and fix them. Done that? Drill with real
              questions for the real deal.
            </p>

            <div className="flex w-full justify-center">
              <Button
              variant={"default"}
                size="lg"
                className="gradient-orange text-white border-0 transition-transform animate-pulse-glow"
              >
                Begin Your Journey
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 lg:px-20 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-[#ff6b35] rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Ez.Exam</span>
          </div>
          <p className="text-gray-400">
            Created with real tutors, Built from past-year paper analysis
          </p>
        </div>
      </footer>
    </div>
  );
}
