INSERT INTO collections VALUES
    ('integrals', 'Интегралы'),
    ('ode', 'ДУ'),
    ('limits', 'Пределы'),
    ('tailor', 'Тейлор'),
    ('rows', 'Ряды'),
    ('multiple_integrals', 'Кратные интегралы'),
    ('diff', 'Дифференцирование'),
    ('complex', 'Комплексные числа');

-- ИНТЕГРАЛЫ
INSERT INTO tasks VALUES
    ('int1', '\int x^2 dx', 'integrals'),
    ('int2', '\int e^x dx', 'integrals'),
    ('int3', '\int \sin x dx', 'integrals'),
    ('int4', '\int \frac{1}{x} dx', 'integrals'),
    ('int5', '\int \cos x dx', 'integrals'),
    ('int6', '\int \frac{1}{1+x^2} dx', 'integrals'),
    ('int7', '\int \frac{1}{\sqrt{1-x^2}} dx', 'integrals'),
    ('int8', '\int \ln x dx', 'integrals'),
    ('int9', '\int \frac{1}{\cos^2 x} dx', 'integrals'),
    ('int10', '\int a^x dx', 'integrals');

INSERT INTO options VALUES
    ('int1.1', '\frac{x^3}{3} + C', TRUE, 'int1'),
    ('int1.2', 'x^3 + C', FALSE, 'int1'),
    ('int1.3', '2x + C', FALSE, 'int1'),
    ('int1.4', '\frac{x^2}{2} + C', FALSE, 'int1'),
    
    ('int2.1', 'e^x + C', TRUE, 'int2'),
    ('int2.2', 'xe^x + C', FALSE, 'int2'),
    ('int2.3', '\frac{e^x}{x} + C', FALSE, 'int2'),
    ('int2.4', '\ln e^x + C', FALSE, 'int2'),
    
    ('int3.1', '-\cos x + C', TRUE, 'int3'),
    ('int3.2', '\cos x + C', FALSE, 'int3'),
    ('int3.3', '\sin x + C', FALSE, 'int3'),
    ('int3.4', '-\sin x + C', FALSE, 'int3'),
    
    ('int4.1', '\ln|x| + C', TRUE, 'int4'),
    ('int4.2', 'x^{-2} + C', FALSE, 'int4'),
    ('int4.3', '\frac{1}{x^2} + C', FALSE, 'int4'),
    ('int4.4', 'e^x + C', FALSE, 'int4'),
    
    ('int5.1', '\sin x + C', TRUE, 'int5'),
    ('int5.2', '-\sin x + C', FALSE, 'int5'),
    ('int5.3', '\cos x + C', FALSE, 'int5'),
    ('int5.4', '-\cos x + C', FALSE, 'int5'),
    
    ('int6.1', '\arctan x + C', TRUE, 'int6'),
    ('int6.2', '\arcsin x + C', FALSE, 'int6'),
    ('int6.3', '\frac{1}{2}\ln(1+x^2) + C', FALSE, 'int6'),
    ('int6.4', '\frac{x}{1+x^2} + C', FALSE, 'int6'),
    
    ('int7.1', '\arcsin x + C', TRUE, 'int7'),
    ('int7.2', '\arccos x + C', FALSE, 'int7'),
    ('int7.3', '\arctan x + C', FALSE, 'int7'),
    ('int7.4', '2\sqrt{1-x^2} + C', FALSE, 'int7'),
    
    ('int8.1', 'x\ln x - x + C', TRUE, 'int8'),
    ('int8.2', '\frac{1}{x} + C', FALSE, 'int8'),
    ('int8.3', 'x\ln x + C', FALSE, 'int8'),
    ('int8.4', '\frac{\ln^2 x}{2} + C', FALSE, 'int8'),
    
    ('int9.1', '\tan x + C', TRUE, 'int9'),
    ('int9.2', '\cot x + C', FALSE, 'int9'),
    ('int9.3', '\sec x + C', FALSE, 'int9'),
    ('int9.4', '\sin x + C', FALSE, 'int9'),
    
    ('int10.1', '\frac{a^x}{\ln a} + C', TRUE, 'int10'),
    ('int10.2', 'a^x + C', FALSE, 'int10'),
    ('int10.3', 'xa^x + C', FALSE, 'int10'),
    ('int10.4', '\frac{a^x}{x} + C', FALSE, 'int10');

-- ДИФФЕРЕНЦИАЛЬНЫЕ УРАВНЕНИЯ
INSERT INTO tasks VALUES
    ('ode1', 'y'' = y', 'ode'),
    ('ode2', 'y'' + y = 0', 'ode'),
    ('ode3', 'y'' = 2x', 'ode'),
    ('ode4', 'y'' = ky (k=const)', 'ode'),
    ('ode5', 'y'' = \sin x', 'ode'),
    ('ode6', 'y'' = \frac{1}{x}', 'ode'),
    ('ode7', 'y'' + 4y = 0', 'ode'),
    ('ode8', 'y'' = y^2', 'ode'),
    ('ode9', 'y'' = e^x', 'ode'),
    ('ode10', 'y'' = \cos x', 'ode');

INSERT INTO options VALUES
    ('ode1.1', 'y = Ce^x', TRUE, 'ode1'),
    ('ode1.2', 'y = e^{x^2}', FALSE, 'ode1'),
    ('ode1.3', 'y = \ln x', FALSE, 'ode1'),
    ('ode1.4', 'y = x^2', FALSE, 'ode1'),
    
    ('ode2.1', 'y = C_1\cos x + C_2\sin x', TRUE, 'ode2'),
    ('ode2.2', 'y = e^x', FALSE, 'ode2'),
    ('ode2.3', 'y = x^2', FALSE, 'ode2'),
    ('ode2.4', 'y = \ln x', FALSE, 'ode2'),
    
    ('ode3.1', 'y = x^2 + C', TRUE, 'ode3'),
    ('ode3.2', 'y = 2x + C', FALSE, 'ode3'),
    ('ode3.3', 'y = x^3 + C', FALSE, 'ode3'),
    ('ode3.4', 'y = e^{2x} + C', FALSE, 'ode3'),
    
    ('ode4.1', 'y = Ce^{kx}', TRUE, 'ode4'),
    ('ode4.2', 'y = kx + C', FALSE, 'ode4'),
    ('ode4.3', 'y = e^{x^k}', FALSE, 'ode4'),
    ('ode4.4', 'y = \ln(kx)', FALSE, 'ode4'),
    
    ('ode5.1', 'y = -\cos x + C', TRUE, 'ode5'),
    ('ode5.2', 'y = \sin x + C', FALSE, 'ode5'),
    ('ode5.3', 'y = \cos x + C', FALSE, 'ode5'),
    ('ode5.4', 'y = -\sin x + C', FALSE, 'ode5'),
    
    ('ode6.1', 'y = \ln|x| + C', TRUE, 'ode6'),
    ('ode6.2', 'y = \frac{1}{x} + C', FALSE, 'ode6'),
    ('ode6.3', 'y = e^x + C', FALSE, 'ode6'),
    ('ode6.4', 'y = x\ln x + C', FALSE, 'ode6'),
    
    ('ode7.1', 'y = C_1\cos 2x + C_2\sin 2x', TRUE, 'ode7'),
    ('ode7.2', 'y = e^{4x}', FALSE, 'ode7'),
    ('ode7.3', 'y = e^{-4x}', FALSE, 'ode7'),
    ('ode7.4', 'y = 4x + C', FALSE, 'ode7'),
    
    ('ode8.1', 'y = -\frac{1}{x + C}', TRUE, 'ode8'),
    ('ode8.2', 'y = \frac{1}{x^2}', FALSE, 'ode8'),
    ('ode8.3', 'y = e^{x^2}', FALSE, 'ode8'),
    ('ode8.4', 'y = \ln(x+C)', FALSE, 'ode8'),
    
    ('ode9.1', 'y = e^x + C', TRUE, 'ode9'),
    ('ode9.2', 'y = xe^x + C', FALSE, 'ode9'),
    ('ode9.3', 'y = \frac{e^x}{x} + C', FALSE, 'ode9'),
    ('ode9.4', 'y = \ln e^x + C', FALSE, 'ode9'),
    
    ('ode10.1', 'y = \sin x + C', TRUE, 'ode10'),
    ('ode10.2', 'y = -\sin x + C', FALSE, 'ode10'),
    ('ode10.3', 'y = \cos x + C', FALSE, 'ode10'),
    ('ode10.4', 'y = -\cos x + C', FALSE, 'ode10');

-- ПРЕДЕЛЫ
INSERT INTO tasks VALUES
    ('lim1', '\lim_{x \to 0} \frac{\sin x}{x}', 'limits'),
    ('lim2', '\lim_{x \to \infty} \left(1 + \frac{1}{x}\right)^x', 'limits'),
    ('lim3', '\lim_{x \to 0} \frac{e^x - 1}{x}', 'limits'),
    ('lim4', '\lim_{x \to 0} \frac{\ln(1+x)}{x}', 'limits'),
    ('lim5', '\lim_{x \to 0} \frac{1 - \cos x}{x^2}', 'limits'),
    ('lim6', '\lim_{x \to \infty} \frac{x^2 + 1}{2x^2 - 3}', 'limits'),
    ('lim7', '\lim_{x \to 1} \frac{x^2 - 1}{x - 1}', 'limits'),
    ('lim8', '\lim_{x \to 0} \frac{\tan x}{x}', 'limits'),
    ('lim9', '\lim_{x \to \infty} \frac{3x^3 - 2x}{4x^3 + 5}', 'limits'),
    ('lim10', '\lim_{x \to 0} \frac{a^x - 1}{x}', 'limits');

INSERT INTO options VALUES
    ('lim1.1', '1', TRUE, 'lim1'),
    ('lim1.2', '0', FALSE, 'lim1'),
    ('lim1.3', '\infty', FALSE, 'lim1'),
    ('lim1.4', '\frac{1}{2}', FALSE, 'lim1'),
    
    ('lim2.1', 'e', TRUE, 'lim2'),
    ('lim2.2', '1', FALSE, 'lim2'),
    ('lim2.3', '\infty', FALSE, 'lim2'),
    ('lim2.4', '0', FALSE, 'lim2'),
    
    ('lim3.1', '1', TRUE, 'lim3'),
    ('lim3.2', '0', FALSE, 'lim3'),
    ('lim3.3', 'e', FALSE, 'lim3'),
    ('lim3.4', '\infty', FALSE, 'lim3'),
    
    ('lim4.1', '1', TRUE, 'lim4'),
    ('lim4.2', '0', FALSE, 'lim4'),
    ('lim4.3', 'e', FALSE, 'lim4'),
    ('lim4.4', '\infty', FALSE, 'lim4'),
    
    ('lim5.1', '\frac{1}{2}', TRUE, 'lim5'),
    ('lim5.2', '1', FALSE, 'lim5'),
    ('lim5.3', '0', FALSE, 'lim5'),
    ('lim5.4', '2', FALSE, 'lim5'),
    
    ('lim6.1', '\frac{1}{2}', TRUE, 'lim6'),
    ('lim6.2', '1', FALSE, 'lim6'),
    ('lim6.3', '0', FALSE, 'lim6'),
    ('lim6.4', '\infty', FALSE, 'lim6'),
    
    ('lim7.1', '2', TRUE, 'lim7'),
    ('lim7.2', '1', FALSE, 'lim7'),
    ('lim7.3', '0', FALSE, 'lim7'),
    ('lim7.4', '\infty', FALSE, 'lim7'),
    
    ('lim8.1', '1', TRUE, 'lim8'),
    ('lim8.2', '0', FALSE, 'lim8'),
    ('lim8.3', '\infty', FALSE, 'lim8'),
    ('lim8.4', '\frac{1}{2}', FALSE, 'lim8'),
    
    ('lim9.1', '\frac{3}{4}', TRUE, 'lim9'),
    ('lim9.2', '1', FALSE, 'lim9'),
    ('lim9.3', '0', FALSE, 'lim9'),
    ('lim9.4', '\infty', FALSE, 'lim9'),
    
    ('lim10.1', '\ln a', TRUE, 'lim10'),
    ('lim10.2', '1', FALSE, 'lim10'),
    ('lim10.3', 'a', FALSE, 'lim10'),
    ('lim10.4', '0', FALSE, 'lim10');

-- РЯДЫ ТЕЙЛОРА
INSERT INTO tasks VALUES
    ('tay1', 'e^x (x_0=0)', 'tailor'),
    ('tay2', '\sin x (x_0=0)', 'tailor'),
    ('tay3', '\cos x (x_0=0)', 'tailor'),
    ('tay4', '\ln(1+x) (x_0=0)', 'tailor'),
    ('tay5', '(1+x)^\alpha (x_0=0)', 'tailor'),
    ('tay6', '\frac{1}{1-x} (x_0=0)', 'tailor'),
    ('tay7', '\arctan x (x_0=0)', 'tailor'),
    ('tay8', '\sinh x (x_0=0)', 'tailor'),
    ('tay9', '\cosh x (x_0=0)', 'tailor'),
    ('tay10', 'e^{-x^2} (x_0=0)', 'tailor');

INSERT INTO options VALUES
    ('tay1.1', '\sum_{n=0}^\infty \frac{x^n}{n!}', TRUE, 'tay1'),
    ('tay1.2', '\sum_{n=0}^\infty x^n', FALSE, 'tay1'),
    ('tay1.3', '\sum_{n=0}^\infty (-1)^n \frac{x^n}{n!}', FALSE, 'tay1'),
    ('tay1.4', '\sum_{n=0}^\infty \frac{x^{2n}}{(2n)!}', FALSE, 'tay1'),
    
    ('tay2.1', '\sum_{n=0}^\infty (-1)^n \frac{x^{2n+1}}{(2n+1)!}', TRUE, 'tay2'),
    ('tay2.2', '\sum_{n=0}^\infty \frac{x^{2n+1}}{(2n+1)!}', FALSE, 'tay2'),
    ('tay2.3', '\sum_{n=0}^\infty (-1)^n \frac{x^{2n}}{(2n)!}', FALSE, 'tay2'),
    ('tay2.4', '\sum_{n=0}^\infty \frac{x^n}{n!}', FALSE, 'tay2'),
    
    ('tay3.1', '\sum_{n=0}^\infty (-1)^n \frac{x^{2n}}{(2n)!}', TRUE, 'tay3'),
    ('tay3.2', '\sum_{n=0}^\infty \frac{x^{2n}}{(2n)!}', FALSE, 'tay3'),
    ('tay3.3', '\sum_{n=0}^\infty (-1)^n \frac{x^{2n+1}}{(2n+1)!}', FALSE, 'tay3'),
    ('tay3.4', '\sum_{n=0}^\infty \frac{x^n}{n!}', FALSE, 'tay3'),
    
    ('tay4.1', '\sum_{n=1}^\infty (-1)^{n+1} \frac{x^n}{n}', TRUE, 'tay4'),
    ('tay4.2', '\sum_{n=0}^\infty \frac{x^n}{n}', FALSE, 'tay4'),
    ('tay4.3', '\sum_{n=1}^\infty \frac{x^n}{n}', FALSE, 'tay4'),
    ('tay4.4', '\sum_{n=0}^\infty (-1)^n x^n', FALSE, 'tay4'),
    
    ('tay5.1', '\sum_{n=0}^\infty C_\alpha^n x^n', TRUE, 'tay5'),
    ('tay5.2', '\sum_{n=0}^\infty \alpha^n x^n', FALSE, 'tay5'),
    ('tay5.3', '\sum_{n=0}^\infty \frac{\alpha^n x^n}{n!}', FALSE, 'tay5'),
    ('tay5.4', '\sum_{n=0}^\infty (-1)^n C_\alpha^n x^n', FALSE, 'tay5'),
    
    ('tay6.1', '\sum_{n=0}^\infty x^n', TRUE, 'tay6'),
    ('tay6.2', '\sum_{n=0}^\infty (-1)^n x^n', FALSE, 'tay6'),
    ('tay6.3', '\sum_{n=1}^\infty x^n', FALSE, 'tay6'),
    ('tay6.4', '\sum_{n=0}^\infty \frac{x^n}{n!}', FALSE, 'tay6'),
    
    ('tay7.1', '\sum_{n=0}^\infty (-1)^n \frac{x^{2n+1}}{2n+1}', TRUE, 'tay7'),
    ('tay7.2', '\sum_{n=0}^\infty \frac{x^{2n+1}}{2n+1}', FALSE, 'tay7'),
    ('tay7.3', '\sum_{n=0}^\infty (-1)^n \frac{x^{2n}}{2n}', FALSE, 'tay7'),
    ('tay7.4', '\sum_{n=0}^\infty \frac{x^n}{n}', FALSE, 'tay7'),
    
    ('tay8.1', '\sum_{n=0}^\infty \frac{x^{2n+1}}{(2n+1)!}', TRUE, 'tay8'),
    ('tay8.2', '\sum_{n=0}^\infty (-1)^n \frac{x^{2n+1}}{(2n+1)!}', FALSE, 'tay8'),
    ('tay8.3', '\sum_{n=0}^\infty \frac{x^{2n}}{(2n)!}', FALSE, 'tay8'),
    ('tay8.4', '\sum_{n=0}^\infty \frac{x^n}{n!}', FALSE, 'tay8'),
    
    ('tay9.1', '\sum_{n=0}^\infty \frac{x^{2n}}{(2n)!}', TRUE, 'tay9'),
    ('tay9.2', '\sum_{n=0}^\infty (-1)^n \frac{x^{2n}}{(2n)!}', FALSE, 'tay9'),
    ('tay9.3', '\sum_{n=0}^\infty \frac{x^{2n+1}}{(2n+1)!}', FALSE, 'tay9'),
    ('tay9.4', '\sum_{n=0}^\infty \frac{x^n}{n!}', FALSE, 'tay9'),
    
    ('tay10.1', '\sum_{n=0}^\infty (-1)^n \frac{x^{2n}}{n!}', TRUE, 'tay10'),
    ('tay10.2', '\sum_{n=0}^\infty \frac{x^{2n}}{n!}', FALSE, 'tay10'),
    ('tay10.3', '\sum_{n=0}^\infty (-1)^n \frac{x^n}{n!}', FALSE, 'tay10'),
    ('tay10.4', '\sum_{n=0}^\infty \frac{x^{2n}}{(2n)!}', FALSE, 'tay10');

-- ЧИСЛОВЫЕ РЯДЫ
INSERT INTO tasks VALUES
    ('row1', '\sum_{n=1}^\infty \frac{1}{n^2}', 'rows'),
    ('row2', '\sum_{n=1}^\infty \frac{1}{n}', 'rows'),
    ('row3', '\sum_{n=1}^\infty \frac{1}{2^n}', 'rows'),
    ('row4', '\sum_{n=0}^\infty \frac{1}{n!}', 'rows'),
    ('row5', '\sum_{n=1}^\infty (-1)^{n-1} \frac{1}{n}', 'rows'),
    ('row6', '\sum_{n=1}^\infty \frac{1}{n(n+1)}', 'rows'),
    ('row7', '\sum_{n=1}^\infty \frac{n}{2^n}', 'rows'),
    ('row8', '\sum_{n=1}^\infty \frac{1}{\sqrt{n}}', 'rows'),
    ('row9', '\sum_{n=1}^\infty \frac{1}{n^p} (p>1)', 'rows'),
    ('row10', '\sum_{n=1}^\infty q^n (|q|<1)', 'rows');

INSERT INTO options VALUES
    ('row1.1', '\frac{\pi^2}{6}', TRUE, 'row1'),
    ('row1.2', '\infty', FALSE, 'row1'),
    ('row1.3', '1', FALSE, 'row1'),
    ('row1.4', '\frac{\pi}{4}', FALSE, 'row1'),
    
    ('row2.1', 'расходится', TRUE, 'row2'),
    ('row2.2', '1', FALSE, 'row2'),
    ('row2.3', '2', FALSE, 'row2'),
    ('row2.4', '\ln 2', FALSE, 'row2'),
    
    ('row3.1', '1', TRUE, 'row3'),
    ('row3.2', '2', FALSE, 'row3'),
    ('row3.3', '\frac{1}{2}', FALSE, 'row3'),
    ('row3.4', '\infty', FALSE, 'row3'),
    
    ('row4.1', 'e', TRUE, 'row4'),
    ('row4.2', '1', FALSE, 'row4'),
    ('row4.3', '2', FALSE, 'row4'),
    ('row4.4', '\infty', FALSE, 'row4'),
    
    ('row5.1', '\ln 2', TRUE, 'row5'),
    ('row5.2', '1', FALSE, 'row5'),
    ('row5.3', '\frac{\pi}{4}', FALSE, 'row5'),
    ('row5.4', 'расходится', FALSE, 'row5'),
    
    ('row6.1', '1', TRUE, 'row6'),
    ('row6.2', '\frac{1}{2}', FALSE, 'row6'),
    ('row6.3', '\infty', FALSE, 'row6'),
    ('row6.4', '2', FALSE, 'row6'),
    
    ('row7.1', '2', TRUE, 'row7'),
    ('row7.2', '1', FALSE, 'row7'),
    ('row7.3', '\frac{1}{2}', FALSE, 'row7'),
    ('row7.4', '\infty', FALSE, 'row7'),
    
    ('row8.1', 'расходится', TRUE, 'row8'),
    ('row8.2', '2', FALSE, 'row8'),
    ('row8.3', '1', FALSE, 'row8'),
    ('row8.4', '\sqrt{2}', FALSE, 'row8'),
    
    ('row9.1', 'сходится', TRUE, 'row9'),
    ('row9.2', 'расходится', FALSE, 'row9'),
    ('row9.3', 'сходится при p>0', FALSE, 'row9'),
    ('row9.4', 'всегда расходится', FALSE, 'row9'),
    
    ('row10.1', '\frac{q}{1-q}', FALSE, 'row10'),
    ('row10.2', '\frac{1}{1-q}', TRUE, 'row10'),
    ('row10.3', '\frac{1}{q}', FALSE, 'row10'),
    ('row10.4', '\frac{q}{q-1}', FALSE, 'row10');

-- КРАТНЫЕ ИНТЕГРАЛЫ
INSERT INTO tasks VALUES
    ('multi1', '\iint\limits_D dx\,dy,\ D: 0 \le x \le 1,\ 0 \le y \le 2', 'multiple_integrals'),
    ('multi2', '\iint\limits_D x\,dx\,dy,\ D: 0 \le x \le 2,\ 0 \le y \le 3', 'multiple_integrals'),
    ('multi3', '\iint\limits_D (x+y)\,dx\,dy,\ D: 0 \le x \le 1,\ 0 \le y \le 1', 'multiple_integrals'),
    ('multi4', '\iint\limits_D xy\,dx\,dy,\ D: 0 \le x \le 2,\ 0 \le y \le 1', 'multiple_integrals'),
    ('multi5', '\iint\limits_{x^2+y^2 \le R^2} dx\,dy', 'multiple_integrals'),
    ('multi6', '\iint\limits_{x^2+y^2 \le 1} \sqrt{1-x^2-y^2}\,dx\,dy', 'multiple_integrals'),
    ('multi7', '\int_0^1 \int_0^{1-x} dy\,dx', 'multiple_integrals'),
    ('multi8', '\iiint\limits_V dx\,dy\,dz,\ V: 0 \le x \le 1,\ 0 \le y \le 2,\ 0 \le z \le 3', 'multiple_integrals'),
    ('multi9', '\iiint\limits_{x^2+y^2+z^2 \le R^2} dx\,dy\,dz', 'multiple_integrals'),
    ('multi10', '\int_0^1 \int_0^{x} \int_0^{xy} dz\,dy\,dx', 'multiple_integrals');

INSERT INTO options VALUES
    ('multi1.1', '2', TRUE, 'multi1'),
    ('multi1.2', '1', FALSE, 'multi1'),
    ('multi1.3', '3', FALSE, 'multi1'),
    ('multi1.4', '4', FALSE, 'multi1'),
    
    ('multi2.1', '6', TRUE, 'multi2'),
    ('multi2.2', '4', FALSE, 'multi2'),
    ('multi2.3', '8', FALSE, 'multi2'),
    ('multi2.4', '12', FALSE, 'multi2'),
    
    ('multi3.1', '1', TRUE, 'multi3'),
    ('multi3.2', '0.5', FALSE, 'multi3'),
    ('multi3.3', '2', FALSE, 'multi3'),
    ('multi3.4', '1.5', FALSE, 'multi3'),
    
    ('multi4.1', '1', TRUE, 'multi4'),
    ('multi4.2', '2', FALSE, 'multi4'),
    ('multi4.3', '4', FALSE, 'multi4'),
    ('multi4.4', '0.5', FALSE, 'multi4'),
    
    ('multi5.1', '\pi R^2', TRUE, 'multi5'),
    ('multi5.2', '2\pi R', FALSE, 'multi5'),
    ('multi5.3', '\frac{4}{3}\pi R^3', FALSE, 'multi5'),
    ('multi5.4', 'R^2', FALSE, 'multi5'),
    
    ('multi6.1', '\frac{2}{3}\pi', TRUE, 'multi6'),
    ('multi6.2', '\pi', FALSE, 'multi6'),
    ('multi6.3', '\frac{4}{3}\pi', FALSE, 'multi6'),
    ('multi6.4', '\frac{1}{2}\pi', FALSE, 'multi6'),
    
    ('multi7.1', '0.5', TRUE, 'multi7'),
    ('multi7.2', '1', FALSE, 'multi7'),
    ('multi7.3', '0.25', FALSE, 'multi7'),
    ('multi7.4', '0.75', FALSE, 'multi7'),
    
    ('multi8.1', '6', TRUE, 'multi8'),
    ('multi8.2', '1', FALSE, 'multi8'),
    ('multi8.3', '3', FALSE, 'multi8'),
    ('multi8.4', '12', FALSE, 'multi8'),
    
    ('multi9.1', '\frac{4}{3}\pi R^3', TRUE, 'multi9'),
    ('multi9.2', '\pi R^2', FALSE, 'multi9'),
    ('multi9.3', '2\pi R^2', FALSE, 'multi9'),
    ('multi9.4', '\frac{8}{3}\pi R^3', FALSE, 'multi9'),
    
    ('multi10.1', '\frac{1}{8}', TRUE, 'multi10'),
    ('multi10.2', '\frac{1}{4}', FALSE, 'multi10'),
    ('multi10.3', '\frac{1}{6}', FALSE, 'multi10'),
    ('multi10.4', '\frac{1}{12}', FALSE, 'multi10');

-- ДИФФЕРЕНЦИРОВАНИЕ
INSERT INTO tasks VALUES
    ('diff1', 'f(x) = x^3,\ f''(x) = ?', 'diff'),
    ('diff2', 'f(x) = \sin x,\ f''(x) = ?', 'diff'),
    ('diff3', 'f(x) = e^x,\ f''(x) = ?', 'diff'),
    ('diff4', 'f(x) = \ln x,\ f''(x) = ?', 'diff'),
    ('diff5', 'f(x) = \cos x,\ f''(x) = ?', 'diff'),
    ('diff6', 'f(x) = \tan x,\ f''(x) = ?', 'diff'),
    ('diff7', 'f(x) = \sqrt{x},\ f''(x) = ?', 'diff'),
    ('diff8', 'f(x) = a^x,\ f''(x) = ?', 'diff'),
    ('diff9', 'f(x) = \arcsin x,\ f''(x) = ?', 'diff'),
    ('diff10', 'f(x) = \arctan x,\ f''(x) = ?', 'diff');

INSERT INTO options VALUES
    ('diff1.1', '3x^2', TRUE, 'diff1'),
    ('diff1.2', 'x^2', FALSE, 'diff1'),
    ('diff1.3', '3x', FALSE, 'diff1'),
    ('diff1.4', '2x^3', FALSE, 'diff1'),
    
    ('diff2.1', '\cos x', TRUE, 'diff2'),
    ('diff2.2', '-\cos x', FALSE, 'diff2'),
    ('diff2.3', '-\sin x', FALSE, 'diff2'),
    ('diff2.4', '-\sin x', FALSE, 'diff2'),
    
    ('diff3.1', 'e^x', TRUE, 'diff3'),
    ('diff3.2', 'xe^x', FALSE, 'diff3'),
    ('diff3.3', '0', FALSE, 'diff3'),
    ('diff3.4', 'e^{x-1}', FALSE, 'diff3'),
    
    ('diff4.1', '\frac{1}{x}', TRUE, 'diff4'),
    ('diff4.2', 'x', FALSE, 'diff4'),
    ('diff4.3', '-\frac{1}{x^2}', FALSE, 'diff4'),
    ('diff4.4', 'e^x', FALSE, 'diff4'),
    
    ('diff5.1', '-\sin x', TRUE, 'diff5'),
    ('diff5.2', '\sin x', FALSE, 'diff5'),
    ('diff5.3', '\cos x', FALSE, 'diff5'),
    ('diff5.4', '-\cos x', FALSE, 'diff5'),
    
    ('diff6.1', '\frac{1}{\cos^2 x}', TRUE, 'diff6'),
    ('diff6.2', '-\frac{1}{\cos^2 x}', FALSE, 'diff6'),
    ('diff6.3', '\frac{1}{\sin^2 x}', FALSE, 'diff6'),
    ('diff6.4', '\tan^2 x', FALSE, 'diff6'),
    
    ('diff7.1', '\frac{1}{2\sqrt{x}}', TRUE, 'diff7'),
    ('diff7.2', '\frac{1}{\sqrt{x}}', FALSE, 'diff7'),
    ('diff7.3', '2\sqrt{x}', FALSE, 'diff7'),
    ('diff7.4', '\sqrt{x}', FALSE, 'diff7'),
    
    ('diff8.1', 'a^x \ln a', TRUE, 'diff8'),
    ('diff8.2', 'xa^{x-1}', FALSE, 'diff8'),
    ('diff8.3', 'a^x', FALSE, 'diff8'),
    ('diff8.4', 'e^x \ln a', FALSE, 'diff8'),
    
    ('diff9.1', '\frac{1}{\sqrt{1-x^2}}', TRUE, 'diff9'),
    ('diff9.2', '-\frac{1}{\sqrt{1-x^2}}', FALSE, 'diff9'),
    ('diff9.3', '\frac{1}{1+x^2}', FALSE, 'diff9'),
    ('diff9.4', '-\frac{1}{1+x^2}', FALSE, 'diff9'),
    
    ('diff10.1', '\frac{1}{1+x^2}', TRUE, 'diff10'),
    ('diff10.2', '-\frac{1}{1+x^2}', FALSE, 'diff10'),
    ('diff10.3', '\frac{1}{\sqrt{1-x^2}}', FALSE, 'diff10'),
    ('diff10.4', '-\frac{1}{\sqrt{1-x^2}}', FALSE, 'diff10');

-- КОМПЛЕКСНЫЕ ЧИСЛА
INSERT INTO tasks VALUES
    ('comp1', 'i^2 = ?', 'complex'),
    ('comp2', '(a+bi)+(c+di) = ?', 'complex'),
    ('comp3', '(a+bi)\cdot(c+di) = ?', 'complex'),
    ('comp4', '|a+bi| = ?', 'complex'),
    ('comp5', 'e^{i\pi} = ?', 'complex'),
    ('comp6', 'e^{i\theta} = ? (формула Эйлера)', 'complex'),
    ('comp7', 'z = r(\cos\theta + i\sin\theta),\ z^n = ?', 'complex'),
    ('comp8', 'z = 1+i,\ |z| = ?', 'complex'),
    ('comp9', '\overline{a+bi} = ?', 'complex'),
    ('comp10', 'z = \cos\theta + i\sin\theta,\ z\cdot\overline{z} = ?', 'complex');

INSERT INTO options VALUES
    ('comp1.1', '-1', TRUE, 'comp1'),
    ('comp1.2', '1', FALSE, 'comp1'),
    ('comp1.3', 'i', FALSE, 'comp1'),
    ('comp1.4', '-i', FALSE, 'comp1'),
    
    ('comp2.1', '(a+c)+(b+d)i', TRUE, 'comp2'),
    ('comp2.2', '(a+c)+(b-d)i', FALSE, 'comp2'),
    ('comp2.3', '(a-c)+(b+d)i', FALSE, 'comp2'),
    ('comp2.4', '(ac-bd)+(ad+bc)i', FALSE, 'comp2'),
    
    ('comp3.1', '(ac-bd)+(ad+bc)i', TRUE, 'comp3'),
    ('comp3.2', '(ac+bd)+(ad+bc)i', FALSE, 'comp3'),
    ('comp3.3', '(ac-bd)+(ad-bc)i', FALSE, 'comp3'),
    ('comp3.4', '(a+c)+(b+d)i', FALSE, 'comp3'),
    
    ('comp4.1', '\sqrt{a^2+b^2}', TRUE, 'comp4'),
    ('comp4.2', 'a^2+b^2', FALSE, 'comp4'),
    ('comp4.3', '|a|+|b|', FALSE, 'comp4'),
    ('comp4.4', '\sqrt{a^2-b^2}', FALSE, 'comp4'),
    
    ('comp5.1', '-1', TRUE, 'comp5'),
    ('comp5.2', '1', FALSE, 'comp5'),
    ('comp5.3', 'i', FALSE, 'comp5'),
    ('comp5.4', '-i', FALSE, 'comp5'),
    
    ('comp6.1', '\cos\theta + i\sin\theta', TRUE, 'comp6'),
    ('comp6.2', '\cos\theta - i\sin\theta', FALSE, 'comp6'),
    ('comp6.3', '\sin\theta + i\cos\theta', FALSE, 'comp6'),
    ('comp6.4', '\sin\theta - i\cos\theta', FALSE, 'comp6'),
    
    ('comp7.1', 'r^n(\cos n\theta + i\sin n\theta)', TRUE, 'comp7'),
    ('comp7.2', 'r(\cos n\theta + i\sin n\theta)', FALSE, 'comp7'),
    ('comp7.3', 'r^n(\cos\theta + i\sin\theta)', FALSE, 'comp7'),
    ('comp7.4', 'n r(\cos\theta + i\sin\theta)', FALSE, 'comp7'),
    
    ('comp8.1', '\sqrt{2}', TRUE, 'comp8'),
    ('comp8.2', '2', FALSE, 'comp8'),
    ('comp8.3', '1', FALSE, 'comp8'),
    ('comp8.4', '0', FALSE, 'comp8'),
    
    ('comp9.1', 'a-bi', TRUE, 'comp9'),
    ('comp9.2', 'a+bi', FALSE, 'comp9'),
    ('comp9.3', '-a-bi', FALSE, 'comp9'),
    ('comp9.4', '-a+bi', FALSE, 'comp9'),
    
    ('comp10.1', '1', TRUE, 'comp10'),
    ('comp10.2', '0', FALSE, 'comp10'),
    ('comp10.3', '2', FALSE, 'comp10'),
    ('comp10.4', 'i', FALSE, 'comp10');