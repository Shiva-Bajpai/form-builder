import { useUserContext } from "@/store/userStore";
import { useCallback, useRef, useState } from "react";

const useDragAndDrop = () => {
  const { formBuilderData, setFormBuilderData } = useUserContext();
  const draggedIndex = useRef<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const touchStartIndex = useRef<number | null>(null);

  // Handle drag start
  const handleDragStart = useCallback((index: number) => {
    draggedIndex.current = index;
  }, []);

  // Handle drag over
  const handleDragOver = useCallback(
    (e: React.DragEvent, index: number) => {
      e.preventDefault();
      if (hoveredIndex !== index) {
        setHoveredIndex(index);
      }
    },
    [hoveredIndex]
  );

  // Handle drag leave
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setHoveredIndex(null);
  }, []);

  // Handle drop
  const handleDrop = useCallback(
    (e: React.DragEvent, index: number) => {
      e.preventDefault();

      if (draggedIndex.current === null || draggedIndex.current === index) {
        draggedIndex.current = null;
        setHoveredIndex(null);
        return;
      }

      const updatedQuestions = [...formBuilderData.questions];
      const [draggedQuestion] = updatedQuestions.splice(
        draggedIndex.current,
        1
      );
      updatedQuestions.splice(index, 0, draggedQuestion);

      setFormBuilderData((prev) => ({ ...prev, questions: updatedQuestions }));
      draggedIndex.current = null;
      setHoveredIndex(null);
    },
    [draggedIndex, formBuilderData.questions, setFormBuilderData]
  );

  // Handle touch start
  const handleTouchStart = useCallback((index: number) => {
    touchStartIndex.current = index;
  }, []);

  // Handle touch move
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    // const touch = e.touches[0];
    // const element = document.elementFromPoint(touch.clientX, touch.clientY);
    // if (!element) return;

    // const newHoveredIndex = Number(element.getAttribute("data-index"));
    // if (hoveredIndex !== newHoveredIndex && !isNaN(newHoveredIndex)) {
    //   setHoveredIndex(newHoveredIndex);
    // }
  }, []);

  // Handle touch end
  const handleTouchEnd = useCallback(() => {
    if (
      touchStartIndex.current === null ||
      hoveredIndex === null ||
      touchStartIndex.current === hoveredIndex
    ) {
      touchStartIndex.current = null;
      setHoveredIndex(null);
      return;
    }

    const updatedQuestions = [...formBuilderData.questions];
    const [draggedQuestion] = updatedQuestions.splice(
      touchStartIndex.current,
      1
    );
    updatedQuestions.splice(hoveredIndex, 0, draggedQuestion);

    setFormBuilderData((prev) => ({ ...prev, questions: updatedQuestions }));
    touchStartIndex.current = null;
    setHoveredIndex(null);
  }, [hoveredIndex, formBuilderData.questions, setFormBuilderData]);

  return {
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    hoveredIndex,
  };
};

export default useDragAndDrop;
