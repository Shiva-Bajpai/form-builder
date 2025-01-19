import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  forwardRef,
} from "react";

interface CustomInputProps
  extends React.HTMLProps<HTMLDivElement>,
    VariantProps<typeof inputVariants> {
  onChanged?: (value: string) => void;
  value?: string;
  placeholder?: string;
}

const inputVariants = cva(
  "flex w-full rounded-md border border-input bg-transparent text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:bg-peerlistHoverBackground md:text-base overflow-wrap-break-word",
  {
    variants: {
      variant: {
        default: "",
        title:
          "border-none rounded-none font-semibold shadow-none outline-none focus-visible:ring-0 text-muted-foreground max-md:text-sm",
        helpText:
          "border-none rounded-none text-xs md:text-sm shadow-none outline-none focus-visible:ring-0",
        notFilled:
          "text-xs px-2 py-1.5 shadow-none outline-none focus-visible:ring-0",
      },
    },
    defaultVariants: {
      variant: "notFilled",
    },
  }
);

const CustomInput = forwardRef<HTMLDivElement, CustomInputProps>(
  (
    {
      className = "",
      placeholder = "Write a question",
      variant,
      onChanged,
      value: propValue,
      ...props
    },
    ref
  ) => {
    const [localValue, setLocalValue] = useState(propValue || "");
    const [confirmedValue, setConfirmedValue] = useState(propValue || "");
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLDivElement>(null);
    const caretPositionRef = useRef<number>(0);

    const saveCaretPosition = useCallback(() => {
      if (inputRef.current) {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const preCaretRange = range.cloneRange();
          preCaretRange.selectNodeContents(inputRef.current);
          preCaretRange.setEnd(range.endContainer, range.endOffset);
          caretPositionRef.current = preCaretRange.toString().length;
        }
      }
    }, []);

    const restoreCaretPosition = useCallback(() => {
      if (inputRef.current) {
        const selection = window.getSelection();
        const range = document.createRange();
        let currentOffset = 0;

        const traverseNodes = (
          node: Node
        ): { node: Node; offset: number } | null => {
          if (node.nodeType === Node.TEXT_NODE) {
            const nodeLength = node.textContent?.length || 0;
            if (currentOffset + nodeLength >= caretPositionRef.current) {
              return {
                node,
                offset: caretPositionRef.current - currentOffset,
              };
            }
            currentOffset += nodeLength;
          }
          for (let i = 0; i < node.childNodes.length; i++) {
            const result = traverseNodes(node.childNodes[i]);
            if (result) return result;
          }
          return null;
        };

        const caretInfo = traverseNodes(inputRef.current);
        if (caretInfo && selection) {
          range.setStart(caretInfo.node, caretInfo.offset);
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    }, []);

    const handleInputChange = useCallback(
      (e: React.FormEvent<HTMLDivElement>) => {
        saveCaretPosition();
        const newValue = e.currentTarget.textContent || "";
        setLocalValue(newValue);
      },
      [saveCaretPosition]
    );

    const handleBlur = useCallback(() => {
      setIsFocused(false);
      if (localValue !== confirmedValue) {
        onChanged?.(localValue);
        setConfirmedValue(localValue);
      }
    }, [localValue, confirmedValue, onChanged]);

    const handleFocus = useCallback(() => {
      setIsFocused(true);
      restoreCaretPosition();
    }, [restoreCaretPosition]);

    useEffect(() => {
      if (propValue !== undefined && propValue !== confirmedValue) {
        setLocalValue(propValue);
        setConfirmedValue(propValue);
      }
    }, [propValue, confirmedValue]);

    useEffect(() => {
      if (isFocused) {
        restoreCaretPosition();
      }
    }, [localValue, restoreCaretPosition, isFocused]);

    return (
      <div
        ref={inputRef}
        role="textbox"
        contentEditable
        suppressContentEditableWarning
        aria-multiline="false"
        data-placeholder={placeholder}
        className={cn(
          inputVariants({ variant }),
          "relative break-words whitespace-pre-wrap",
          isFocused || localValue.trim().length > 0
            ? "text-black"
            : "text-muted-foreground",
          "after:absolute after:top-1/2 after:-translate-y-1/2 after:left-0 after:text-muted-foreground after:pointer-events-none after:opacity-50",
          !localValue && `after:content-[attr(data-placeholder)]`,
          className
        )}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onInput={handleInputChange}
        {...props}
      >
        {localValue}
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";

export default CustomInput;
