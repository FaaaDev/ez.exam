import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import {
  lessonList,
  setLessonDetail,
  setLoadingLesson,
} from "@/store/slices/lessonSlice";
import { getLessons, getLessonsDetail } from "@/lib/api/lessons";
import { v4 as uuidv4 } from 'uuid';

export default function SelectLessons() {
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const dispatch = useDispatch();
  const lesson = useSelector((state: RootState) => state.lesson);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLessons();
    setIsAnimating(true);
  }, []);

  const handleAnswerSelect = (lessonIndex: number) => {
    setSelectedLesson(lessonIndex);
  };

  const fetchLessons = async () => {
    dispatch(setLoadingLesson(true));
    const data = await getLessons();
    dispatch(lessonList(data));
    dispatch(setLoadingLesson(false));
  };

  const fetchLessonsId = async () => {
    if (selectedLesson != null) {
      dispatch(setLoadingLesson(true));
      const data = await getLessonsDetail(lesson.list[selectedLesson || 0].id);
      dispatch(setLessonDetail(data));
      dispatch(setLoadingLesson(false));
      const key = JSON.stringify({atempId: uuidv4(), lessonId: data.id, problemId:data.problems[0].id})
      setTimeout(() => {
        navigate(`/quiz/${btoa(key)}`)
      }, 300);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Quiz Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card
          className={`shadow-lg border-0 ${
            isAnimating ? "animate-bounce-in" : ""
          }`}
        >
          <CardContent className="p-8">
            {/* Question */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-relaxed">
                Select Lessons
              </h1>
            </div>

            {/* Options */}
            <div className="grid gap-4 mb-8">
              {lesson.list.map((les, index) => {
                let buttonClass =
                  "w-full p-6 text-left border-2 rounded-xl transition-all duration-300 hover:scale-105";

                if (selectedLesson === index) {
                  buttonClass +=
                    " bg-blue-100 border-blue-500 text-blue-800 animate-pulse-glow";
                } else {
                  buttonClass +=
                    " bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={buttonClass}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          selectedLesson === index
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-lg font-medium">{les.title}</span>
                        <span className="text-sm text-muted-foreground">
                          {les.description}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            <div className="flex justify-end">
              <Button
                onClick={() => fetchLessonsId()}
                disabled={selectedLesson === null && lesson.isLoading}
                variant={selectedLesson === null ? "outline" : "default"}
                size="lg"
                className={`${
                  selectedLesson === null
                    ? "bg-gray-200"
                    : "gradient-orange text-white "
                }`}
              >
                Next
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
