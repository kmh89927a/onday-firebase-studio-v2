'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Briefcase, Users, User, MapPin } from 'lucide-react';
import { LoadSavedSearchButton } from './LoadSavedSearchButton';

const diagnosisSchema = z
  .object({
    mode: z.enum(['couple', 'single'], {
      required_error: '진단 모드를 선택해주세요.',
    }),
    address1: z.string().min(2, {
      message: '첫 번째 직장 주소를 입력해주세요.',
    }),
    address2: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.mode === 'couple' && (!data.address2 || data.address2.length < 2)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '배우자의 직장 주소를 입력해주세요.',
        path: ['address2'],
      });
    }
  });

type DiagnosisFormValues = z.infer<typeof diagnosisSchema>;

export function DiagnosisForm() {
  const router = useRouter();
  const form = useForm<DiagnosisFormValues>({
    resolver: zodResolver(diagnosisSchema),
    defaultValues: {
      mode: 'couple',
      address1: '',
      address2: '',
    },
    mode: 'onChange',
  });

  const mode = form.watch('mode');

  function onSubmit(values: DiagnosisFormValues) {
    const params = new URLSearchParams();
    params.set('mode', values.mode);
    params.set('addrA', values.address1);
    if (values.mode === 'couple' && values.address2) {
      params.set('addrB', values.address2);
    }
    
    router.push(`/diagnosis/result?${params.toString()}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <LoadSavedSearchButton />
        
        <FormField
          control={form.control}
          name="mode"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-base font-bold">진단 모드</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                  className="grid grid-cols-2 gap-4"
                >
                  <FormItem>
                    <FormControl>
                      <RadioGroupItem value="couple" className="sr-only" />
                    </FormControl>
                    <FormLabel
                      className={`flex flex-col items-center justify-center p-4 border-2 rounded-2xl cursor-pointer transition-all gap-2 ${
                        field.value === 'couple'
                          ? 'border-primary bg-blue-50 text-primary'
                          : 'border-slate-100 hover:border-slate-200 text-muted-foreground'
                      }`}
                    >
                      <Users className="w-6 h-6" />
                      <span className="font-bold">맞벌이 커플</span>
                    </FormLabel>
                  </FormItem>
                  <FormItem>
                    <FormControl>
                      <RadioGroupItem value="single" className="sr-only" />
                    </FormControl>
                    <FormLabel
                      className={`flex flex-col items-center justify-center p-4 border-2 rounded-2xl cursor-pointer transition-all gap-2 ${
                        field.value === 'single'
                          ? 'border-primary bg-blue-50 text-primary'
                          : 'border-slate-100 hover:border-slate-200 text-muted-foreground'
                      }`}
                    >
                      <User className="w-6 h-6" />
                      <span className="font-bold">1인 가구</span>
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-6">
          <FormField
            control={form.control}
            name="address1"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-bold flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary" />
                  {mode === 'couple' ? '내 직장 주소' : '직장 주소'}
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="예) 테헤란로 427"
                      className="h-14 rounded-xl pl-4 pr-10 border-slate-200"
                      {...field}
                    />
                    <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {mode === 'couple' && (
            <FormField
              control={form.control}
              name="address2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-bold flex items-center gap-2 text-secondary-foreground">
                    <Briefcase className="w-4 h-4 text-secondary" />
                    배우자 직장 주소
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="예) 판교역로 166"
                        className="h-14 rounded-xl pl-4 pr-10 border-slate-200"
                        {...field}
                      />
                      <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <Button
          type="submit"
          className="w-full h-14 text-lg font-bold rounded-xl shadow-xl shadow-primary/20 transition-all hover:scale-[1.02]"
          disabled={!form.formState.isValid}
        >
          진단 시작하기
        </Button>
      </form>
    </Form>
  );
}
