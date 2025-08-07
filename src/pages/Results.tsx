import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Trophy,
  Target,
  RotateCcw,
  Home,
  TrendingUp,
  Award,
  BookOpen,
  Brain,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Results() {
  const [searchParams] = useSearchParams();
  const score = parseInt(searchParams.get("score") || "0");
  const total = parseInt(searchParams.get("total") || "5");
  const percentage = Math.round((score / total) * 100);

  const [isVisible, setIsVisible] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    // Animate score counting
    const timer = setTimeout(() => {
      let current = 0;
      const increment = score / 20;
      const counter = setInterval(() => {
        current += increment;
        if (current >= score) {
          setAnimatedScore(score);
          clearInterval(counter);
        } else {
          setAnimatedScore(Math.floor(current));
        }
      }, 50);
    }, 500);

    return () => clearTimeout(timer);
  }, [score]);

  const getPerformanceMessage = () => {
    if (percentage >= 80)
      return {
        message: "Excellent! You're a star! 🌟",
        color: "text-green-600",
        bgColor: "bg-green-100",
      };
    if (percentage >= 60)
      return {
        message: "Good job! Keep it up! 👍",
        color: "text-blue-600",
        bgColor: "bg-blue-100",
      };
    if (percentage >= 40)
      return {
        message: "Not bad! Room for improvement! 📚",
        color: "text-yellow-600",
        bgColor: "bg-yellow-100",
      };
    return {
      message: "Keep practicing! You'll get there! 💪",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    };
  };

  const performance = getPerformanceMessage();

  const recommendations = [
    {
      icon: BookOpen,
      title: "Review Weak Areas",
      description: "Focus on topics where you made mistakes",
      action: "Start Review",
    },
    {
      icon: Target,
      title: "Practice More",
      description: "Take more quizzes to improve your skills",
      action: "More Quizzes",
    },
    {
      icon: TrendingUp,
      title: "Track Progress",
      description: "Monitor your improvement over time",
      action: "View Dashboard",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#ff6b35] rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">Ez.Exam</span>
            </div>
            <Badge className="bg-green-100 text-green-800">
              Quiz Complete!
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Results Card */}
        <Card
          className={`shadow-lg border-0 mb-8 ${
            isVisible ? "animate-bounce-in" : "opacity-0"
          }`}
        >
          <CardContent className="p-8 text-center">
            {/* Mascot */}
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="absolute inset-0 bg-yellow-200 rounded-full blur-2xl opacity-50 animate-pulse"></div>
              <div className="flex items-center justify-center h-full z-20">
                <Trophy className="w-20 h-20 text-yellow-500" />
              </div>
            </div>

            {/* Score Display */}
            <div className="mb-6">
              <div className="text-6xl font-bold text-gray-900 mb-2">
                {animatedScore}/{total}
              </div>
              <div className="text-2xl font-semibold text-gray-600 mb-4">
                {percentage}% Correct
              </div>
               <Badge
                className={`${performance.bgColor} ${performance.color} text-lg px-4 py-2 mb-4`}
              >
                {performance.message}
              </Badge>
              <Progress
                value={percentage}
                className="h-3 mb-4"
                color="bg-[#ff6b35]"
              />
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{score}</div>
                <div className="text-sm text-gray-600">Correct</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {total - score}
                </div>
                <div className="text-sm text-gray-600">Incorrect</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{total}</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant={"default"}
                size="lg"
                className="w-full sm:w-auto gradient-orange text-white border-0 transition-transform"
                onClick={() => navigate("/quiz")}
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Try Again
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={() => navigate("/dashboard")}>
                <TrendingUp className="w-5 h-5 mr-2" />
                View Dashboard
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={() => navigate("/")}>
                <Home className="w-5 h-5 mr-2" />
                Home
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            What's Next?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {recommendations.map((rec, index) => (
              <Card
                key={index}
                className={`hover:scale-105 transition-all duration-300 border-0 shadow-lg ${
                  isVisible ? "animate-slide-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 gradient-orange rounded-xl flex items-center justify-center mx-auto mb-4">
                    <rec.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {rec.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {rec.description}
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    {rec.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Achievement Badge */}
        {percentage >= 80 && (
          <Card
            className={`gradient-orange text-white text-center shadow-lg border-0 ${
              isVisible ? "animate-bounce-in" : "opacity-0"
            }`}
            style={{ animationDelay: "0.8s" }}
          >
            <CardContent className="p-6">
              <Award className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Achievement Unlocked!</h3>
              <p className="opacity-90">Quiz Master - Scored 80% or higher!</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
