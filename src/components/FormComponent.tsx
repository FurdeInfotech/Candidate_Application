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
import { Separator } from "./ui/separator";
import { computerLanguagesData } from "@/lib/data";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

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
      maritalStatus: undefined,
      caste: "",
      address: "",
      languages: [],
      schoolname: "",
      sscyear: "",
      sscmarks: "",
      hscdiplomaname: "",
      hscdiplomadepartment: "",
      hscdiplomayear: "",
      hscdiplomamarks: "",
      graduationname: undefined,
      graduationdepartment: undefined,
      graduationyear: undefined,
      graduationmarks: undefined,
      pgraduationname: undefined,
      pgraduationdepartment: undefined,
      pgraduationyear: undefined,
      pgraduationmarks: undefined,
      department: undefined,
      post: "",
      referredBy: "",
      experience: "",
      courses: "",
      computerLanguages: [],
      typingSkills: undefined,
      vehicle: undefined,
      license: undefined,
      salary: "",
      capableToDoWork: ""
    },
  });
  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    // const formData = new FormData();
    console.log(data);
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
        <div className=" flex flex-row justify-between items-center">
        <h1 className=" font-semibold">Personal Details</h1>
        <p className="text-neutral-800 md:text-base text-sm">
        Fields with an asterisk <span className="font-bold text-neutral-950">*</span> are required.
        </p>
        </div>
        
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
                    placeholder="Enter Contact No."
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
                    placeholder="Enter Emergency Contact No."
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
                  <div className="mt-1 text-right md:text-xs text-[10px]  ">
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
                      <SelectValue placeholder="Select Marital Status" />
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
                  <div className="mt-1 text-right md:text-xs text-[10px]  ">
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
                <FormLabel>10. Languages Known*</FormLabel>
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

          <Separator className=" col-span-2 md:mt-0 mt-3" />

          {/* Educational Qualifications */}
          <h1 className=" font-semibold">Educational Qualification</h1>
          <div className="col-span-2 grid grid-cols-4 gap-12">
            {/* SSC */}
            <div className="col-span-4 grid grid-cols-4 md:gap-12 gap-6">
              <FormField
                control={form.control}
                name="schoolname"
                render={({ field }) => (
                  <FormItem className="md:col-span-2 col-span-4">
                    <FormLabel className="  ">11. SSC*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter School Name"
                        {...field}
                        className="inputstyle"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sscyear"
                render={({ field }) => (
                  <FormItem className=" md:col-span-1 col-span-2">
                    <FormLabel className=" ">Passing Year*</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="inputstyle">
                          <SelectValue placeholder="Select Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from(
                            { length: 60 },
                            (_, i) => new Date().getFullYear() - i
                          ).map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sscmarks"
                render={({ field }) => (
                  <FormItem className=" md:col-span-1 col-span-2">
                    <FormLabel className="  ">Percentage / CGPA*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. 90% | CGPA 9.50"
                        {...field}
                        className="inputstyle"
                      />
                    </FormControl>
                    <FormMessage />
                    {!form.formState.errors.address && (
                      <div className="mt-1 text-right text-[10px] md:text-xs  ">
                        Enter your Percentage or CGPA
                      </div>
                    )}
                  </FormItem>
                )}
              />
            </div>

            {/* HSC */}
            <div className="-mt-4 col-span-4 grid grid-cols-4 md:gap-12 gap-6">
              <FormField
                control={form.control}
                name="hscdiplomaname"
                render={({ field }) => (
                  <FormItem className=" md:col-span-1 col-span-4">
                    <FormLabel className="  ">12. HSC / Diploma*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter College Name"
                        {...field}
                        className="inputstyle"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hscdiplomadepartment"
                render={({ field }) => (
                  <FormItem className=" md:col-span-1 col-span-4">
                    <FormLabel className="  ">Department*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Department"
                        {...field}
                        className="inputstyle"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hscdiplomayear"
                render={({ field }) => (
                  <FormItem className=" md:col-span-1 col-span-2">
                    <FormLabel className=" ">Passing Year*</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="inputstyle">
                          <SelectValue placeholder="Select Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from(
                            { length: 60 },
                            (_, i) => new Date().getFullYear() - i
                          ).map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hscdiplomamarks"
                render={({ field }) => (
                  <FormItem className=" md:col-span-1 col-span-2">
                    <FormLabel className="  ">Percentage / CGPA*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. 90% | CGPA 9.50"
                        {...field}
                        className="inputstyle"
                      />
                    </FormControl>
                    <FormMessage />
                    {!form.formState.errors.address && (
                      <div className="mt-1 text-right text-[10px] md:text-xs  ">
                        Enter your Percentage or CGPA
                      </div>
                    )}
                  </FormItem>
                )}
              />
            </div>

            {/* Gradution */}

            <div className="-mt-4 col-span-4 grid grid-cols-4 md:gap-12 gap-6">
              <FormField
                control={form.control}
                name="graduationname"
                render={({ field }) => (
                  <FormItem className=" md:col-span-1 col-span-4">
                    <FormLabel className="  ">13. Graduation</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter College Name"
                        {...field}
                        className="inputstyle"
                        value={field.value ?? undefined}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="graduationdepartment"
                render={({ field }) => (
                  <FormItem className=" md:col-span-1 col-span-4">
                    <FormLabel className="  ">
                      Department / Specialization
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Department"
                        {...field}
                        className="inputstyle"
                        value={field.value ?? undefined}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="graduationyear"
                render={({ field }) => (
                  <FormItem className=" md:col-span-1 col-span-2">
                    <FormLabel className=" ">Passing Year</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(value || undefined)
                        } // Set undefined when no value is selected
                        defaultValue={field.value ?? ""} // Default to empty string if undefined
                      >
                        <SelectTrigger className="inputstyle">
                          <SelectValue placeholder="Select Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from(
                            { length: 60 },
                            (_, i) => new Date().getFullYear() - i
                          ).map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="graduationmarks"
                render={({ field }) => (
                  <FormItem className=" md:col-span-1 col-span-2">
                    <FormLabel className="  ">Percentage / CGPA</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. 90% | CGPA 9.50"
                        {...field}
                        className="inputstyle"
                        value={field.value ?? undefined}
                      />
                    </FormControl>
                    <FormMessage />
                    {!form.formState.errors.address && (
                      <div className="mt-1 text-right text-[10px] md:text-xs  ">
                        Enter your Percentage or CGPA
                      </div>
                    )}
                  </FormItem>
                )}
              />
            </div>

            {/* Post Graduation */}

            <div className="-mt-4 col-span-4 grid grid-cols-4 md:gap-12 gap-6">
              <FormField
                control={form.control}
                name="pgraduationname"
                render={({ field }) => (
                  <FormItem className=" md:col-span-1 col-span-4">
                    <FormLabel className="  ">14. Post Graduation</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter College Name"
                        {...field}
                        className="inputstyle"
                        value={field.value ?? undefined}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pgraduationdepartment"
                render={({ field }) => (
                  <FormItem className=" md:col-span-1 col-span-4">
                    <FormLabel className="  ">
                      Department / Specialization
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Department"
                        {...field}
                        className="inputstyle"
                        value={field.value ?? undefined}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pgraduationyear"
                render={({ field }) => (
                  <FormItem className=" md:col-span-1 col-span-2">
                    <FormLabel className=" ">Passing Year</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(value || undefined)
                        } // Set undefined when no value is selected
                        defaultValue={field.value ?? ""} // Default to empty string if undefined
                      >
                        <SelectTrigger className="inputstyle">
                          <SelectValue placeholder="Select Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from(
                            { length: 60 },
                            (_, i) => new Date().getFullYear() - i
                          ).map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pgraduationmarks"
                render={({ field }) => (
                  <FormItem className=" md:col-span-1 col-span-2">
                    <FormLabel className="  ">Percentage / CGPA</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. 90% | CGPA 9.50"
                        {...field}
                        className="inputstyle"
                        value={field.value ?? undefined}
                      />
                    </FormControl>
                    <FormMessage />
                    {!form.formState.errors.address && (
                      <div className="mt-1 text-right md:text-xs text-[10px]  ">
                        Enter your Percentage or CGPA
                      </div>
                    )}
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Separator className=" col-span-2 md:mt-0 mt-3" />

          <h1 className=" font-semibold col-span-2">Work and Experience</h1>

          {/* Department */}
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem className=" md:col-span-1 col-span-2">
                <FormLabel>15. Applying for Department*</FormLabel>
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
                <FormLabel>16. Applying for Post*</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Post" {...field} />
                </FormControl>
                <FormMessage />
                {!form.formState.errors.address && (
                  <div className="mt-1 text-right md:text-xs text-[10px] text-gray-500">
                    Enter &lsquo;Any&lsquo; if you&apos;re unsure about the specific details.
                  </div>
                )}
              </FormItem>
            )}
          />

          {/* ReferredBy */}
          <FormField
            control={form.control}
            name="referredBy"
            render={({ field }) => (
              <FormItem className=" md:col-span-1 col-span-2">
                <FormLabel>17. Referred By (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Referrer's Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Experience */}
          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem className="md:col-span-1 col-span-2">
                <FormLabel>18. Experience*</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter Your Prior Experience"
                    {...field}
                    className="inputstyle resize-none"
                    maxLength={200}
                  />
                </FormControl>
                <FormMessage />
                {!form.formState.errors.address && (
                  <div className="mt-1 text-right md:text-xs text-[10px] text-gray-500">
                    Fresher kindly enter N/A | Max 200 characters
                  </div>
                )}
              </FormItem>
            )}
          />

          {/* Courses */}
          <FormField
            control={form.control}
            name="courses"
            render={({ field }) => (
              <FormItem className=" md:col-span-1 col-span-2">
                <FormLabel>
                  19. Computer Basic Skills / Other Courses*
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter Courses Done"
                    {...field}
                    className="inputstyle resize-none"
                    maxLength={200}
                  />
                </FormControl>
                <FormMessage />
                {!form.formState.errors.address && (
                  <div className="mt-1 text-right text-[10px] md:text-xs text-gray-500">
                    Enter courses separated with commas e.g. MS-CIT, Excel |
                    Enter N/A if no courses have been completed.
                  </div>
                )}
              </FormItem>
            )}
          />

          {/* Computer Languages */}
          <FormField
            control={form.control}
            name="computerLanguages"
            render={({ field }) => (
              <FormItem className=" md:col-span-1 col-span-2">
                <FormLabel>20. Computer Languages*</FormLabel>
                <FormControl>
                  <MultipleSelector
                    selectedValues={field.value || []}
                    onChange={field.onChange}
                    options={computerLanguagesData}
                  />
                </FormControl>
                <FormMessage />
                {!form.formState.errors.address && (
                  <div className="mt-1 text-right text-[10px] md:text-xs text-gray-500">
                    Choose &lsquo;Not Applicable&lsquo; if none apply.
                  </div>
                )}
              </FormItem>
            )}
          />

          {/* Typing Skills */}
          <FormField
            control={form.control}
            name="typingSkills"
            render={({ field }) => (
              <FormItem className="col-span-2 space-y-3 md:pb-0 pb-2">
                <FormLabel>21. Typing Skills*</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row space-x-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="30 WPM" />
                      </FormControl>
                      <FormLabel className="font-normal">30 WPM</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="40 WPM" />
                      </FormControl>
                      <FormLabel className="font-normal">40 WPM</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="50 WPM" />
                      </FormControl>
                      <FormLabel className="font-normal">50 WPM</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Not Applicable" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Not Applicable
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

            {/* Vehicle */}
            <FormField
            control={form.control}
            name="vehicle"
            render={({ field }) => (
              <FormItem className="col-span-1 space-y-3 md:pb-0 pb-2">
                <FormLabel>22. Own a Vehicle?*</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row space-x-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="No" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>                                    
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

           {/* license */}
           <FormField
            control={form.control}
            name="license"
            render={({ field }) => (
              <FormItem className="col-span-1 space-y-3 md:pb-0 pb-2">
                <FormLabel>23. License*</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row space-x-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="No" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>                                    
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

           {/* salary */}
           <FormField
            control={form.control}
            name="salary"
            render={({ field }) => (
              <FormItem className="md:col-span-1 col-span-2">
                <FormLabel>23. Salary Expectation*</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


           {/* capabe to do works */}
           <FormField
            control={form.control}
            name="capableToDoWork"
            render={({ field }) => (
              <FormItem className="md:col-span-1 col-span-2">
                <FormLabel>24. Capable to do Work (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="What work can you do?"
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
        </div>
        <div className="flex flex-row items-center justify-center ">
          <Button
            type="submit"
            disabled={isLoading}
            className=" w-full sm:w-40"
          >
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
