INSERT INTO collections VALUES ('test1', 'Test collection'), ('test2', 'Another test collection');

INSERT INTO tasks VALUES ('task1', '(\sqrt x)''', 'test1'), ('task2', '(\ln x)''', 'test1');

INSERT INTO options VALUES
    ('1.1', '\frac 1 {2 \sqrt x}', TRUE, 'task1'),
    ('1.2', '\frac 1 {\sqrt x}', FALSE, 'task1'),
    ('1.3', '\frac 2 {\sqrt x}', FALSE, 'task1'),
    ('1.4', '\frac 1 {2 x}', FALSE, 'task1'),
    ('2.1', '\frac 1 {x^2}', FALSE, 'task2'),
    ('2.2', '\frac 1 x', TRUE, 'task2'),
    ('2.3', '\frac 1 {\sqrt {1 - x^2}}', FALSE, 'task2'),
    ('2.4', '\frac 1 {2 x}', FALSE, 'task2');
