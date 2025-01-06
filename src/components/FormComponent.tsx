"use client";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { FormSchema } from "@/schemas/FormSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { Textarea } from "./ui/textarea";
import { MultipleSelector } from "./multiselector";

type FormData = z.infer<typeof FormSchema>;

function FormComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // State to track the selected month and year
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      dob: undefined,
      gender: undefined,
      contact: "",
      emergencyContact: "",
      referredBy: "",
      post: "",
      department: undefined,
      maritalStatus: undefined,
      caste: "",
      address: "",
      languages: [],
    },
  });
  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const formData = new FormData();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onError = (errors: any) => {
    const firstErrorField = Object.keys(errors)[0]; // Get the first field with an error
    if (firstErrorField) {
      form.setFocus(firstErrorField as keyof FormData); // Focus on the first error field
      const errorElement = document.querySelector(
        `input[name="${firstErrorField}"], textarea[name="${firstErrorField}"], select[name="${firstErrorField}"]`
      );
      if (errorElement) {
        errorElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="space-y-7 mt-14 flex flex-col"
      >
        <div className="grid grid-cols-2 md:gap-12 gap-6">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className=" md:col-span-1 col-span-2">
                <FormLabel>1. Name*</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className=" md:col-span-1 col-span-2">
                <FormLabel>2. Email*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Your Email"
                    {...field}
                    className="inputstyle"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* D.O.B. */}
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>3. D.O.B.*</FormLabel>
                <FormControl>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          onClick={() => setOpen(!open)}
                          className={cn("w-full hover:bg-transparent")}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Enter Birth Date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-4" align="start">
                      <div className="flex flex-row items-center justify-between gap-5">
                        <Select
                          defaultValue={selectedMonth.toString()}
                          onValueChange={(month) =>
                            setSelectedMonth(parseInt(month))
                          }
                        >
                          <SelectTrigger className="w-full mb-2 text-xs">
                            <SelectValue placeholder="Select Month" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => (
                              <SelectItem key={i} value={i.toString()}>
                                {format(new Date(2021, i), "MMMM")}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Select
                          defaultValue={selectedYear.toString()}
                          onValueChange={(year) =>
                            setSelectedYear(parseInt(year))
                          }
                        >
                          <SelectTrigger className="w-full mb-2 text-xs">
                            <SelectValue placeholder="Select Year" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from(
                              { length: 100 },
                              (_, i) => new Date().getFullYear() - i
                            ).map((year) => (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Calendar
                        mode="single"
                        selected={field.value as Date | undefined}
                        onSelect={(date) => {
                          field.onChange(date?.toISOString());
                          setOpen(false); // Close the popover when a date is selected
                        }}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        defaultMonth={new Date(selectedYear, selectedMonth)}
                        month={new Date(selectedYear, selectedMonth)}
                        onMonthChange={(date) => {
                          setSelectedYear(date.getFullYear());
                          setSelectedMonth(date.getMonth());
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Gender */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>4. Gender*</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="inputstyle">
                      <SelectValue placeholder="Select Your Gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className=" w-full">
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Contact */}
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>5. Contact No.*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Contact Number"
                    {...field}
                    maxLength={10}
                    className="inputstyle"
                    type="text" // Keep type="text" for maxLength support
                    onInput={(e) => {
                      const input = e.target as HTMLInputElement;
                      input.value = input.value.replace(/\D/g, ""); // Remove non-numeric characters
                      if (input.value.length > 10) {
                        input.value = input.value.slice(0, 10); // Enforce 10 digits max
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Emergency Contact */}
          <FormField
            control={form.control}
            name="emergencyContact"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>6. Emergency Contact No.</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Emergency Contact Number"
                    {...field}
                    maxLength={10}
                    className="inputstyle"
                    type="text" // Keep type="text" for maxLength support
                    onInput={(e) => {
                      const input = e.target as HTMLInputElement;
                      input.value = input.value.replace(/\D/g, ""); // Remove non-numeric characters
                      if (input.value.length > 10) {
                        input.value = input.value.slice(0, 10); // Enforce 10 digits max
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
                {!form.formState.errors.address && (
                  <div className="mt-1 text-right md:text-xs text-[10px] text-gray-500">
                    (Optional)
                  </div>
                )}
              </FormItem>
            )}
          />

          {/* Marital Status */}
          <FormField
            control={form.control}
            name="maritalStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>7. Marital Status*</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="inputstyle">
                      <SelectValue placeholder="Select Your Marital Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Single">Single</SelectItem>
                    <SelectItem value="Married">Married</SelectItem>
                    <SelectItem value="Widowed">Widowed</SelectItem>
                    <SelectItem value="Divorced">Divorced</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Caste */}
          <FormField
            control={form.control}
            name="caste"
            render={({ field }) => (
              <FormItem>
                <FormLabel>8. Caste*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Your Caste"
                    {...field}
                    className="inputstyle"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className=" sm:col-span-1 col-span-2">
                <FormLabel>9. Address*</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter Your Full Address"
                    {...field}
                    className="inputstyle resize-none"
                    maxLength={200}
                  />
                </FormControl>
                <FormMessage />
                {!form.formState.errors.address && (
                  <div className="mt-1 text-right md:text-xs text-[10px] text-gray-500">
                    Max 200 characters
                  </div>
                )}
              </FormItem>
            )}
          />

           {/* Languages */}
           <FormField
              control={form.control}
              name="languages"
              render={({ field }) => (
                <FormItem className=" sm:col-span-1 col-span-2">
                  <FormLabel>Languages Known*</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      selectedValues={field.value || []}
                      onChange={field.onChange}
                      options={[
                        { value: "English", label: "English" },
                        { value: "Hindi", label: "Hindi" },
                        { value: "Marathi", label: "Marathi" },
                        { value: "Other", label: "Other" },
                      ]}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          {/* Department */}
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem className=" md:col-span-1 col-span-2">
                <FormLabel>Department*</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="inputstyle">
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className=" w-full">
                    <SelectItem value="IT">IT</SelectItem>
                    <SelectItem value="KPO">KPO</SelectItem>
                    <SelectItem value="BPO">BPO</SelectItem>
                    <SelectItem value="Any">Any</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Post */}
          <FormField
            control={form.control}
            name="post"
            render={({ field }) => (
              <FormItem className=" md:col-span-1 col-span-2">
                <FormLabel>Applying for Post*</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Post" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ReferredBy */}
          <FormField
            control={form.control}
            name="referredBy"
            render={({ field }) => (
              <FormItem className=" md:col-span-1 col-span-2">
                <FormLabel>Referred By (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Referrer's Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row items-center justify-center ">
          <Button type="submit" disabled={isLoading} className=" w-40">
            {isLoading ? (
              <>
                <Loader2 className=" animate-spin" /> Applying
              </>
            ) : (
              "Apply"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default FormComponent;
