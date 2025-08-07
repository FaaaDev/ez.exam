import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { X, Flag, ChevronRight, Loader2Icon } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import {
  getLessonsDetail,
  submitAnswer,
  type Problem,
} from "@/lib/api/lessons";
import { setLessonDetail, setLoadingLesson } from "@/store/slices/lessonSlice";

export default function Quiz() {
  const { key } = useParams<{ key?: string }>();
  const [currentQuestion, setCurrentQuestion] = useState<Problem | null>(null);
  const [questionIndex, setQuestionIndex] = useState(1);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const dispatch = useDispatch();
  const lesson = useSelector((state: RootState) => state.lesson);
  const navigate = useNavigate();

  useEffect(() => {
    checkQuestion();
    setIsAnimating(true);
  }, [key]);

  const checkQuestion = async () => {
    const parsedKey = key ? atob(key) : "";
    const realKey: { atempId: string; lessonId: number; problemId: number } =
      JSON.parse(parsedKey);
    dispatch(setLoadingLesson(true));

    if (
      lesson.detail &&
      lesson.detail.id == realKey.lessonId &&
      lesson.detail.problems.filter(
        (problem) => problem.id === realKey.problemId
      ).length
    ) {
      const index = lesson.detail.problems.findIndex(
        (problem) => problem.id === realKey.problemId
      );

      console.log(index);

      setCurrentQuestion(lesson.detail.problems[index] || null);
      setQuestionIndex(index);
    } else {
      const data = await getLessonsDetail(realKey.lessonId);
      const index = data.problems.findIndex(
        (problem) => problem.id === realKey.problemId
      );
      setCurrentQuestion(data.problems[index] || null);
      setQuestionIndex(index);
      dispatch(setLessonDetail(data));
    }
    dispatch(setLoadingLesson(false));
  };

  const handleAnswerSelect = (optionId: number) => {
    setSelectedOption(optionId);
  };

  const handleNext = async () => {
    if (selectedOption === null) return;

    const parsedKey = key ? atob(key) : "";
    const realKey: { atempId: string; lessonId: number; problemId: number } =
      JSON.parse(parsedKey);

    dispatch(setLoadingLesson(true));

    await submitAnswer(realKey.lessonId, {
      attempt_id: realKey.atempId,
      answer: { problem_id: realKey.problemId, option_id: selectedOption },
    });

    setTimeout(() => {
      if (
        lesson.detail?.problems &&
        questionIndex < lesson.detail?.problems.length - 1
      ) {
        const key = JSON.stringify({
          atempId: realKey.atempId,
          lessonId: realKey.lessonId,
          problemId: lesson.detail.problems[questionIndex + 1].id,
        });
        // window.location.href = `/quiz/${btoa(key)}`;
        navigate(`/quiz/${btoa(key)}`);
      } else {
        // Quiz completed - redirect to results

        navigate(
          `/results?score=${90}&total=${lesson.detail?.problems.length}`
        );
      }
      dispatch(setLoadingLesson(false));
    }, 500);
  };

  return lesson.isLoading ? (
    <div className="flex items-center justify-center w-full h-screen">
      <Loader2Icon className="animate-spin h-7 w-7" />
    </div>
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="outline" size="icon">
                <X className="w-5 h-5" />
              </Button>
            </Link>

            <div className="flex-1 mx-4">
              <Progress
                value={
                  ((questionIndex + 1) / (lesson.detail?.problems.length || 0)) * 100
                }
                className="h-2"
                color={"bg-[#ff6b35]"}
              />
            </div>

            <div className="flex items-center space-x-4">
              {/* <Badge variant="outline" className="hidden sm:flex">
                🇬🇧 English
              </Badge> */}
              <Button variant="outline" size="icon">
                <Flag className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between mt-5">
            <span className="text-sm font-medium text-gray-600">
              Question {questionIndex + 1} / {lesson.detail?.problems.length}
            </span>
            <Badge className="bg-blue-100 text-blue-800">
              {lesson.detail?.title}
            </Badge>
          </div>
        </div>
      </header>

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
                {currentQuestion?.question}
              </h1>
            </div>

            {/* Options */}
            <div className="grid gap-4 mb-8">
              {currentQuestion?.options.map((option, index) => {
                let buttonClass =
                  "w-full p-6 text-left border-2 rounded-xl transition-all duration-300 hover:scale-105";

                if (selectedOption === option.id) {
                  buttonClass +=
                    " bg-blue-100 border-blue-500 text-blue-800 animate-pulse-glow";
                } else {
                  buttonClass +=
                    " bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option.id)}
                    className={buttonClass}
                    disabled={lesson.isLoading}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          selectedOption === option.id
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-lg font-medium">
                        {option.option_text}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            <div className="flex justify-end">
              <Button
                onClick={handleNext}
                disabled={selectedOption === null}
                variant={selectedOption === null ? "outline" : "default"}
                size="lg"
                className={`${
                  selectedOption === null
                    ? "bg-gray-200"
                    : "gradient-orange text-white "
                }`}
              >
                {lesson.detail?.problems &&
                questionIndex === lesson.detail.problems.length - 1
                  ? "Finish Quiz"
                  : "Next"}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
