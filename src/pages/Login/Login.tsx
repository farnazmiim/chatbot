import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import Logo from '../../components/Logo/Logo'
import { useTheme } from '../../hooks/useTheme'
import { useLogin } from '../../hooks/api/useAuth'

const loginSchema = z.object({
  username: z
    .string({ required_error: 'نام کاربری الزامی است' })
    .min(3, 'نام کاربری باید حداقل ۳ کاراکتر باشد')
    .max(50, 'نام کاربری نمی‌تواند بیشتر از ۵۰ کاراکتر باشد')
    .trim(),
  password: z
    .string({ required_error: 'رمز عبور الزامی است' })
    .min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد'),
})

type LoginFormData = z.infer<typeof loginSchema>

function Login() {
  const navigate = useNavigate()
  const { bgClass, textClass, textSecondaryClass } = useTheme()
  const loginMutation = useLogin(() => {
    navigate('/')
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginMutation.mutateAsync({
        username: data.username.trim(),
        password: data.password,
      })
    } catch (error: unknown) {
      console.error('Login error:', error)
    }
  }

  return (
    <div className={`min-h-screen ${bgClass} flex flex-col`}>
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
        <Logo className="mb-6" />

        <h1 className={`text-3xl font-bold ${textClass} mb-4`}>ورود به سیستم</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4">
          <div>
            <input
              type="text"
              {...register('username')}
              placeholder="نام کاربری"
              className={`w-full px-4 py-3 rounded-lg border-2 bg-transparent ${textClass} ${
                errors.username
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-[#00B4D8]'
              } focus:outline-none focus:ring-2 focus:border-transparent`}
              disabled={isSubmitting || loginMutation.isPending}
            />
            {errors.username && (
              <p className={`mt-1 text-sm text-red-500 ${textSecondaryClass}`}>
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              {...register('password')}
              placeholder="رمز عبور"
              className={`w-full px-4 py-3 rounded-lg border-2 bg-transparent ${textClass} ${
                errors.password
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-[#00B4D8]'
              } focus:outline-none focus:ring-2 focus:border-transparent`}
              disabled={isSubmitting || loginMutation.isPending}
            />
            {errors.password && (
              <p className={`mt-1 text-sm text-red-500 ${textSecondaryClass}`}>
                {errors.password.message}
              </p>
            )}
          </div>

          {loginMutation.isError && (
            <div className={`text-red-500 text-sm text-center ${textSecondaryClass}`}>
              {loginMutation.error instanceof Error
                ? loginMutation.error.message
                : 'خطا در ورود به سیستم. لطفاً دوباره تلاش کنید.'}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || loginMutation.isPending}
            className="w-full py-4 px-6 rounded-lg font-medium transition-all duration-200 bg-[#FF6B35] text-white hover:bg-[#FF8C42] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting || loginMutation.isPending ? 'در حال ورود...' : 'ورود'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
