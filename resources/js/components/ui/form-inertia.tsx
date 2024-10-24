import React from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { useForm } from "@inertiajs/react";

const FormWrapper = ({
    children,
    onSubmit,
}: {
    children: React.ReactNode;
    onSubmit: (data: any) => void;
}) => {
    const { data, setData, post, errors } = useForm({});

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(data);
    };

    return <form onSubmit={handleSubmit}>{children}</form>;
};

type FormFieldContextValue = {
    name: string;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
    {} as FormFieldContextValue
);

const FormField = ({
    name,
    children,
}: {
    name: string;
    children: React.ReactNode;
}) => {
    return (
        <FormFieldContext.Provider value={{ name }}>
            {children}
        </FormFieldContext.Provider>
    );
};

const useFormField = () => {
    const fieldContext = React.useContext(FormFieldContext);
    const itemContext = React.useContext(FormItemContext);

    if (!fieldContext) {
        throw new Error("useFormField should be used within <FormField>");
    }

    const { id } = itemContext;

    return {
        id,
        name: fieldContext.name,
        formItemId: `${id}-form-item`,
        formDescriptionId: `${id}-form-item-description`,
        formMessageId: `${id}-form-item-message`,
        // ...fieldState,
    };
};

type FormItemContextValue = {
    id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
    {} as FormItemContextValue
);

const FormItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const id = React.useId();

    return (
        <FormItemContext.Provider value={{ id }}>
            <div ref={ref} className={cn("space-y-2", className)} {...props} />
        </FormItemContext.Provider>
    );
});
FormItem.displayName = "FormItem";

const FormControl = React.forwardRef<
    React.ElementRef<typeof Slot>,
    React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } =
        useFormField();

    return (
        <Slot
            ref={ref}
            id={formItemId}
            aria-describedby={
                !error
                    ? `${formDescriptionId}`
                    : `${formDescriptionId} ${formMessageId}`
            }
            aria-invalid={!!error}
            {...props}
        />
    );
});
FormControl.displayName = "FormControl";

export { FormWrapper, FormField, FormItem, FormControl };
