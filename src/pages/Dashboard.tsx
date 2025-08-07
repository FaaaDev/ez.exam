import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  Target,
  Trophy,
  Play,
  BarChart3,
  Clock,
  Star,
  Zap,
  Award,
  ChevronRight,
  User,
  Settings,
  Brain,
  Gem,
  Book,
  type LucideIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getLessons } from "@/lib/api/lessons";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { lessonList, setLoadingLesson } from "@/store/slices/lessonSlice";
import { setLoadingUser, setProfile, setStat } from "@/store/slices/userSlice";
import { getProfile } from "@/lib/api/users";

export default function Dashboard() {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const lesson = useSelector((state: RootState) => state.lesson);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    fetchLessons();
    fetchUser();
    setIsVisible(true);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const statsIcons: LucideIcon[] = [Trophy, Gem, Zap, Book]
  

  const recentActivity = [
    { subject: "Mathematics", score: "90%", date: "Today", type: "quiz" },
    { subject: "Science", score: "75%", date: "Yesterday", type: "quiz" },
    { subject: "English", score: "80%", date: "2 days ago", type: "quiz" },
    { subject: "Geography", score: "60%", date: "3 days ago", type: "quiz" },
  ];

  const achievements = [
    {
      title: "First Quiz",
      description: "Completed your first quiz",
      earned: true,
    },
    { title: "Quiz Master", description: "Complete 20 quizzes", earned: false },
  ];

  const navigate = useNavigate();

  const fetchLessons = async () => {
    dispatch(setLoadingLesson(true));
    const data = await getLessons();
    dispatch(lessonList(data));
    dispatch(setLoadingLesson(false));
  };

  const fetchUser = async () => {
    dispatch(setLoadingUser(true));
    const data = await getProfile();
    dispatch(setProfile(data));
    dispatch(
      setStat([
        {
          label: "Lessons Complete",
          value: data.lessons_completed,
          color: "text-yellow-600",
        },
        {
          label: "XP Owned",
          value: data.total_xp,
          color: "text-green-600",
        },
        {
          label: "Study Streak",
          value: data.current_streak,
          color: "text-blue-600",
        },
        {
          label: "Total Lessons",
          value: data.total_lessons,
          color: "text-purple-600",
        },
      ])
    );
    dispatch(setLoadingUser(false));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center space-x-2 hover:cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="w-8 h-8 bg-[#ff6b35] rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">Ez.Exam</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" hasRing={false}>
                <Settings className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#ff6b35] rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="hidden sm:block font-medium">{user.profile?.username}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Section */}
        <div className={`mb-8 ${isVisible ? "animate-slide-up" : "opacity-0"}`}>
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <div className="flex flex-col items-center md:items-start">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Welcome back! 👋
              </h1>
              <p className="text-lg text-gray-600">
                Ready to continue your learning journey?
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button
                size="lg"
                variant={"default"}
                className="gradient-orange text-white border-0 transition-transform animate-pulse-glow"
                onClick={() => navigate("/quiz")}
              >
                <Play className="w-5 h-5 mr-2" />
                Start New Quiz
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {user.stats.map((stat, index) => (
            <Card
              key={index}
              className={`hover:scale-105 transition-all duration-300 border-0 shadow-lg ${
                isVisible ? "animate-bounce-in" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-4 text-center">
                {(() => {
                  const Icon = statsIcons[index];
                  return <Icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />;
                })()}
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Subject Progress */}
          <div className="lg:col-span-2">
            <Card
              className={`shadow-lg border-0 mb-8 ${
                isVisible ? "animate-slide-up" : "opacity-0"
              }`}
              style={{ animationDelay: "0.2s" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                  <span>Lesson Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {lesson.list.map((lesson, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-3 h-3 bg-[#ff6b35] rounded-full`}
                        ></div>
                        <span className="font-medium text-gray-900">
                          {lesson.title}
                        </span>
                      </div>

                      <Badge
                        className={
                          lesson.progress_status.is_completed
                            ? "bg-blue-100 text-blue-500"
                            : "bg-orange-100 text-orange-500"
                        }
                      >
                        {lesson.progress_status.is_completed
                          ? "Complete"
                          : "Not Complete"}
                      </Badge>
                    </div>
                    <Progress
                      value={lesson.progress_status.completion_percentage}
                      className={`h-2`}
                      color={"bg-[#ff6b35]"}
                    />
                    <div className="text-right text-sm text-gray-500">
                      {lesson.progress_status.completion_percentage}% complete
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card
              className={`shadow-lg border-0 ${
                isVisible ? "animate-slide-up" : "opacity-0"
              }`}
              style={{ animationDelay: "0.4s" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-green-500" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Trophy className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {activity.subject} Quiz
                          </div>
                          <div className="text-sm text-gray-600">
                            {activity.date}
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        {activity.score}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card
              className={`shadow-lg border-0 ${
                isVisible ? "animate-slide-up" : "opacity-0"
              }`}
              style={{ animationDelay: "0.3s" }}
            >
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="flex space-y-3 flex-col">
                <Button
                  variant="outline"
                  size={"sm"}
                  className="w-full justify-between transition-transform"
                  onClick={() => navigate("/quiz")}
                >
                  <span className="flex items-center">
                    <Play className="w-4 h-4 mr-2" />
                    Take Quiz
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size={"sm"}
                  className="w-full justify-between transition-transform"
                >
                  <span className="flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Analytics
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size={"sm"}
                  className="w-full justify-between transition-transform"
                >
                  <span className="flex items-center">
                    <Target className="w-4 h-4 mr-2" />
                    Set Goals
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card
              className={`shadow-lg border-0 ${
                isVisible ? "animate-slide-up" : "opacity-0"
              }`}
              style={{ animationDelay: "0.5s" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <span>Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-2 rounded-lg ${
                      achievement.earned ? "bg-yellow-50" : "bg-gray-50"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        achievement.earned ? "bg-yellow-500" : "bg-gray-300"
                      }`}
                    >
                      <Star
                        className={`w-4 h-4 ${
                          achievement.earned ? "text-white" : "text-gray-500"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <div
                        className={`font-medium ${
                          achievement.earned ? "text-gray-900" : "text-gray-500"
                        }`}
                      >
                        {achievement.title}
                      </div>
                      <div className="text-xs text-gray-600">
                        {achievement.description}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Motivational Card */}
            <Card
              className={`gradient-bg text-white shadow-lg border-0 ${
                isVisible ? "animate-bounce-in" : "opacity-0"
              }`}
              style={{ animationDelay: "0.6s" }}
            >
              <CardContent className="p-6 text-center">
                <div className="mx-auto flex justify-center">
                  <img
                    src="https://upload.faaadev.cloud/upload/horay.png"
                    alt="Mascot"
                    className="w-auto h-50"
                  />
                </div>
                <h3 className="font-bold mb-2">Keep it up! 🎉</h3>
                <p className="text-sm opacity-90 mb-4">
                  You're doing great! Your consistency is paying off.
                </p>
                <Button variant="secondary" size="sm" className="w-full">
                  Continue Learning
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
