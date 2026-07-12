Easy21 is an all-encompassing class

\__init\__ : sets player sum and dealer's card to 0, resets board

\_draw\_card : 1/3 red, 2/3 black - sets var Value between 0 and 10, returns value, color

\_get\_state : returns tuple of dealer's card, player's sum

reset : player and dealer value set to random black card, is_terminal = False, returns state

**step**: 
returns tuple of (next_state, reward, is_terminal)
if terminal: return (state, 0 reward, True)
if hit: 
draw card - black means add value of card to player_sum, red means subtract from player_sum.
check if bust - player_sum > 21 or < 1 means bust.
if bust - return (state, -1, True)
else - return (state, 0, False)
if stick:
game is terminal
dealer plays according to fixed strat: if < 17 then draw,
if bust then return (state, 1, True)
now check player sum against dealer sum
if player > dealer, reward = 1
if player < dealer, reward = -1
else, reward = 0

starting state: (0, 0) -> **(random(1, 10)**, **random(1, 10)**)
action hit: (random(1, 10), random(1, 10)) -> 