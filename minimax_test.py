import random

def maxv(a,b): return b if a<b else a

def minv(a,b): return a if a<b else b


def end(f, c):
    for i in range(3):
        if f[3*i] != 2 and (f[3*i+1] == f[3*i] and f[3*i] == f[3*i+2]):
            return f[3*i]
        if f[i] != 2 and (f[i] == f[3+i] and f[i] == f[6+i]):
            return f[i]
    if f[4] != 2 and ((f[0] == f[4] and f[0] == f[8]) or (f[2] == f[4] and f[2] == f[6])):
        return f[4]
    if c == 9:
        return 2
    return 3


def minimax(f, h, c, bot):
    res = end(f, c)
    if res < 3:
        if res == 2:
            return random.random()
        if res == 1:
            return 1000 + random.random()
        if res == 0:
            return -1000 - random.random()

    if bot:
        value = -10000
        for i in range(9):
            if f[i] == 2:
                f[i] = 1
                h[c] = i
                value = maxv(value, minimax(f,h,c+1,False))
                f[i] = 2
                h[c] = -1
    else:
        value = 10000
        for i in range(9):
            if f[i] == 2:
                f[i] = 0
                h[c] = i
                value = minv(value, minimax(f,h,c+1,True))
                f[i] = 2
                h[c] = -1
    return value


def playChoice(field, counter):
    x = 0
    score = -1000
    cur_score = random.random()
    history = [-1]*9
    for i in range(9):
        if field[i] != 2:
            continue
        cur_score = random.random()
        field[i] = 1
        history[counter+1] = i
        cur_score = minimax(field, history, counter+1, False) + random.random()
        if cur_score > score:
            x = i
            score = cur_score
        history[counter+1] = -1
        field[i] = 2
    return x, score


def testScenario(field, counter, desc):
    print('\nTesting: ' + desc)
    print('field: ' + str(field) + ' counter:' + str(counter))
    move, score = playChoice(field[:], counter)
    print('Choice: ' + str(move) + ' score:' + str(score))


field1 = [1,1,2,2,0,2,0,0,2]
counter1 = len([v for v in field1 if v != 2])
field2 = [1,1,0,2,0,1,2,1,2]
counter2 = len([v for v in field2 if v != 2])
field3 = [0,1,0,1,0,2,2,1,2]
counter3 = len([v for v in field3 if v != 2])
field4 = [0,1,0,1,0,1,1,0,1]
counter4 = len([v for v in field4 if v != 2])
# Deterministic repeated tests
for _ in range(3):
    testScenario(field1, counter1, 'Bot can win at index 2')
    testScenario(field2, counter2, 'Bot should block at index 6')
    testScenario(field3, counter3, 'Complex board')

# Full board should not produce a valid move (guard prevents any move)
print('\nTesting: Full board draw')
print('field: ' + str(field4) + ' counter:' + str(counter4))
# Play choice should return default 0 since no available moves; but we guard in playChoice
move, score = (-1, -1000)
for i in range(9):
    if field4[i] == 2:
        move, score = playChoice(field4[:], counter4)
        break
if move == -1:
    print('No moves available (full board)')
else:
    print('Move: ' + str(move) + ' score:' + str(score))
