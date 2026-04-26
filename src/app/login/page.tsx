import { LoginForm } from './LoginForm';
import { Home } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col px-6 py-12 justify-center">
      <div className="mb-12 text-center space-y-4">
        <div className="inline-flex items-center justify-center bg-primary p-3 rounded-2xl mb-4 shadow-lg shadow-primary/20">
          <Home className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-headline font-bold tracking-tight">시작하기</h1>
        <p className="text-muted-foreground">
          맞춤형 동네 궁합 진단을 위해<br />
          소셜 계정으로 간편하게 시작하세요.
        </p>
      </div>

      <LoginForm />
      
      <p className="mt-8 text-center text-xs text-muted-foreground">
        로그인 시 내집 코디의 이용약관 및 개인정보 처리방침에<br />동의하는 것으로 간주됩니다.
      </p>
    </div>
  );
}
