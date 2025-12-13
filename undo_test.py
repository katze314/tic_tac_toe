def anymove(field, history, counter, x, bias):
    # simulate anymove as in bot3.js
    if counter < 9:
        if field[x] == 2:
            field[x] = (bias + counter) % 2
            counter += 1
        history[counter] = x
    return counter


def undo1(field, history, counter):
    if counter < 9 and counter > 0:
        last = history[counter]
        field[last] = 2
        history[counter] = -1
        counter -= 1
    return counter

# Test sequence
field = [2]*9
history = [-1]*9
bias = 0
counter = 0
# Initial moves: player at 0, bot at 1
counter = anymove(field, history, counter, 0, bias)
counter = anymove(field, history, counter, 1, bias)
print('After two moves field:', field, 'history:', history, 'counter:', counter)
# Undo once (should undo last bot move index 1)
counter = undo1(field, history, counter)
print('After one undo:', field, 'history:', history, 'counter:', counter)
# Undo again
counter = undo1(field, history, counter)
print('After second undo:', field, 'history:', history, 'counter:', counter)
# Check whether history entries cleared correctly
# Re-do moves and verify if undo() double-calls undo1 only when counter>1
counter = anymove(field, history, counter, 2, bias)
counter = anymove(field, history, counter, 3, bias)
print('After two more moves field:', field, 'history:', history, 'counter:', counter)
if counter > 1:
    counter = undo1(field, history, counter)
    counter = undo1(field, history, counter)
print('After undo() pair:', field, 'history:', history, 'counter:', counter)
