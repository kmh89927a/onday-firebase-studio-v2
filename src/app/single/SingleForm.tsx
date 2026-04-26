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
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Briefcase, MapPin, Coffee, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const singleSchema = z.object({
  workplace: z.string().min(2, {
    message: '직장 주소를 입력해주세요.',
  }),
  leisureHub: z.string().min(2, {
    message: '자주 가는 여가 지역(예: 강남역, 홍대)을 입력해주세요.',
  }),
  safetyEnabled: z.boolean().default(true),
  amenitiesEnabled: z.boolean().default(true),
  cafesEnabled: z.boolean().default(true),
});

type SingleFormValues = z.infer<typeof singleSchema>;

export function SingleForm() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<SingleFormValues>({
    resolver: zodResolver(singleSchema),
    defaultValues: {
      workplace: '',
      leisureHub: '',
      safetyEnabled: true,
      amenitiesEnabled: true,
      cafesEnabled: true,
    },
  });

  async function onSubmit(values: SingleFormValues) {
    const isCapitalRegion = 
      values.workplace.includes('서울') || 
      values.workplace.includes('경기') || 
      values.workplace.includes('인천') ||
      values.leisureHub.includes('서울') || 
      values.leisureHub.includes('경기') || 
      values.leisureHub.includes('인천');

    if (!isCapitalRegion) {
      await new Promise(resolve => setTimeout(resolve, 500));
      toast({
        variant: "destructive",
        title: "지원 지역 아님",
        description: "해당 지역은 현재 수도권만 지원됩니다.",
      });
      return;
    }

    router.push('/single/result');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="workplace"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-bold flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary" />
                  직장 주소
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="예) 서울시 강남구 테헤란로"
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

          <FormField
            control={form.control}
            name="leisureHub"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-bold flex items-center gap-2">
                  <Coffee className="w-4 h-4 text-orange-500" />
                  여가 거점 주소
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="예) 홍대입구역 또는 연남동"
                      className="h-14 rounded-xl pl-4 pr-10 border-slate-200"
                      {...field}
                    />
                    <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  </div>
                </FormControl>
                <FormDescription className="text-[10px]">
                  자주 방문하는 약속 장소나 취미 활동 지역을 입력하세요.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl space-y-4 border border-slate-100">
          <h3 className="font-bold text-sm mb-2">분석 레이어 설정</h3>
          
          <FormField
            control={form.control}
            name="safetyEnabled"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between space-y-0">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                  <FormLabel className="font-medium">🌙 야간 치안 집중 분석</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amenitiesEnabled"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between space-y-0">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-blue-600" />
                  <FormLabel className="font-medium">🏪 편의시설 (편의점/세탁소)</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cafesEnabled"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between space-y-0">
                <div className="flex items-center gap-3">
                  <Coffee className="w-5 h-5 text-amber-700" />
                  <FormLabel className="font-medium">☕ 카페 밀집도 및 카공 지수</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="w-full h-14 text-lg font-bold rounded-xl shadow-xl shadow-primary/20"
        >
          1인 가구 맞춤 진단 시작
        </Button>
      </form>
    </Form>
  );
}
